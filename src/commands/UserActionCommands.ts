import { toast } from '@/components/ui/use-toast';

export interface ClipboardCommand {
  execute: () => Promise<void>;
}

export class CopyToClipboardCommand implements ClipboardCommand {
  constructor(
    private text: string,
    private successMessage: string,
    private errorMessage: string
  ) {}

  async execute(): Promise<void> {
    try {
      if (!navigator.clipboard) {
        throw new Error('Clipboard API não disponível');
      }

      await navigator.clipboard.writeText(this.text);
      
      toast({
        title: 'Sucesso!',
        description: this.successMessage,
      });
    } catch (error) {
      console.error('Erro ao copiar para área de transferência:', error);
      
      toast({
        title: 'Erro',
        description: this.errorMessage,
        variant: 'destructive',
      });
      
      throw error;
    }
  }
}

export class OpenExternalLinkCommand implements ClipboardCommand {
  constructor(
    private url: string,
    private errorMessage: string
  ) {}

  async execute(): Promise<void> {
    try {
      const newWindow = window.open(this.url, '_blank', 'noopener,noreferrer');
      
      if (!newWindow) {
        throw new Error('Pop-up bloqueado pelo navegador');
      }
    } catch (error) {
      console.error('Erro ao abrir link externo:', error);
      
      toast({
        title: 'Erro',
        description: this.errorMessage,
        variant: 'destructive',
      });
      
      throw error;
    }
  }
}
