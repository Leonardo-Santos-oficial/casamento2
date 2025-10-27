import { Heart, Gift, QrCode, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PixQRCode } from "@/components/PixQRCode";
import { WEDDING_INFO } from "@/constants/wedding-info";
import { useLoadingState } from "@/hooks/use-loading-state";
import { useAnalytics } from "@/hooks/use-analytics";
import { CopyToClipboardCommand, OpenExternalLinkCommand } from "@/commands/UserActionCommands";

const MotionSection = motion.section;

const Index = () => {
  const pixKey = WEDDING_INFO.pixKey;
  const pixCopyState = useLoadingState();
  const amazonLinkState = useLoadingState();
  const { trackEngagement, trackNavigation, trackError } = useAnalytics();


  const handleAmazonList = async () => {
    amazonLinkState.startLoading();
    trackNavigation('open_amazon_list', 'Amazon Wishlist');
    
    const command = new OpenExternalLinkCommand(
      WEDDING_INFO.amazonListUrl,
      'Não foi possível abrir a lista. Por favor, tente novamente.'
    );
    
    try {
      await command.execute();
      amazonLinkState.setSuccess();
      trackEngagement('amazon_list_opened', 'Success');
    } catch {
      amazonLinkState.setError();
      trackError('amazon_list_failed', 'Failed to open link');
    } finally {
      setTimeout(() => amazonLinkState.reset(), 2000);
    }
  };

  const handlePixCopy = async () => {
    pixCopyState.startLoading();
    trackEngagement('copy_pix_key', 'PIX Key Copy Attempt');
    
    const command = new CopyToClipboardCommand(
      pixKey,
      'Chave PIX copiada para a área de transferência.',
      'Não foi possível copiar a chave PIX. Por favor, tente novamente.'
    );
    
    try {
      await command.execute();
      pixCopyState.setSuccess();
      trackEngagement('pix_key_copied', 'Success');
    } catch {
      pixCopyState.setError();
      trackError('pix_copy_failed', 'Clipboard API error');
    } finally {
      setTimeout(() => pixCopyState.reset(), 2000);
    }
  };


  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <MotionSection
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20"
        >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Foto do casal */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <img
                  src="/lovable-uploads/8cb39578-95f5-4493-9a10-e1d29097ecba.png"
                  alt="Leonardo e Crystal"
                  className="w-40 h-40 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover rounded-full border-8 border-white shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-rose-500 text-white p-3 rounded-full shadow-lg">
                  <Heart className="w-8 h-8" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
              Leonardo <span className="text-rose-500">&</span> Crystal
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-6">Estamos nos casando!</p>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
              Se você deseja nos presentear e fazer parte deste momento especial, 
              preparamos uma lista de presentes e também aceitamos contribuições via PIX. 
              Sua generosidade será muito bem-vinda!
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleAmazonList} 
                size="lg" 
                className="text-lg"
                disabled={amazonLinkState.isLoading}
              >
                <Gift className="mr-2 h-5 w-5" />
                {amazonLinkState.isLoading ? 'Abrindo...' : 'Ver Lista de Presentes'}
              </Button>
              <Button 
                onClick={handlePixCopy} 
                variant="outline" 
                size="lg" 
                className="text-lg"
                disabled={pixCopyState.isLoading}
              >
                <QrCode className="mr-2 h-5 w-5" />
                {pixCopyState.isLoading ? 'Copiando...' : 'PIX'}
              </Button>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Nossa História */}
      <MotionSection
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-background"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-foreground">Nossa História</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Nosso amor cresceu dia após dia, construindo uma base sólida de carinho, 
                  respeito e cumplicidade. Cada momento juntos nos trouxe a certeza de que 
                  queremos caminhar lado a lado para sempre.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Agora, chegou o momento de oficializar nossa união e começar uma nova 
                  jornada como família. Queremos compartilhar essa alegria com as pessoas 
                  que amamos!
                </p>
              </div>
              <div className="flex justify-center">
                <div className="bg-rose-50 dark:bg-rose-950/20 p-8 rounded-2xl">
                  <Heart className="w-20 h-20 text-rose-500 mx-auto mb-4" />
                  <p className="text-2xl font-semibold text-foreground">Juntos para sempre</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Lista de Presentes */}
      <MotionSection
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-muted/30"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-foreground">Lista de Presentes</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Preparamos uma lista especial na Amazon com itens que nos ajudarão a construir 
              nosso novo lar. Cada presente será recebido com muito carinho e gratidão.
            </p>
            
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <Gift className="w-16 h-16 text-rose-500 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Amazon Lista de Desejos</h3>
                <p className="text-muted-foreground mb-6">
                  Clique no botão abaixo para acessar nossa lista de presentes na Amazon. 
                  Você pode escolher qualquer item que desejar nos presentear.
                </p>
                <Button onClick={handleAmazonList} size="lg" className="w-full" disabled={amazonLinkState.isLoading}>
                  <ExternalLink className="mr-2 h-5 w-5" />
                  {amazonLinkState.isLoading ? 'Abrindo...' : 'Acessar Lista na Amazon'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </MotionSection>

      {/* Doação PIX */}
      <MotionSection
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-background"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-foreground">Contribuição via PIX</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Se preferir, você também pode contribuir via PIX. Sua generosidade nos ajudará 
              a realizar nossos sonhos de casal.
            </p>
            
            <div className="max-w-md mx-auto">
              <PixQRCode
                pixKey={pixKey}
                recipientName={WEDDING_INFO.pixRecipientName}
                city={WEDDING_INFO.pixRecipientCity}
                cep={WEDDING_INFO.pixRecipientCep}
                onCopy={handlePixCopy}
              />
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Como Contribuir */}
      <MotionSection
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-muted/30"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-foreground">Como Contribuir</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-rose-500 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Escolha uma opção</h3>
                <p className="text-muted-foreground">Lista Amazon ou PIX</p>
              </div>
              
              <div className="text-center">
                <div className="bg-rose-500 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Faça sua contribuição</h3>
                <p className="text-muted-foreground">Selecione o presente ou valor</p>
              </div>
              
              <div className="text-center">
                <div className="bg-rose-500 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Receba nosso carinho</h3>
                <p className="text-muted-foreground">Sua generosidade será lembrada</p>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Agradecimentos */}
      <MotionSection
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-20 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20"
        >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="w-16 h-16 text-rose-500 mx-auto mb-8" />
            <h2 className="text-4xl font-bold mb-8 text-foreground">Nosso Agradecimento</h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              Cada presente e contribuição será recebido com muito carinho e gratidão. 
              Vocês estão nos ajudando a construir nosso lar e iniciar esta nova jornada. 
              Muito obrigado pela generosidade!
            </p>
            <p className="text-2xl font-semibold text-foreground">
              Com muito amor, Leonardo & Crystal 💕
            </p>
          </div>
        </div>
      </MotionSection>
    </div>
  );
};

export default Index;
