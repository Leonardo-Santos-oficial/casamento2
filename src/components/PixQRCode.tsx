import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode } from 'lucide-react';
import { PixService } from '@/services/PixService';

interface PixQRCodeProps {
  pixKey: string;
  recipientName: string;
  city: string;
  cep?: string;
  onCopy?: () => void;
}

export const PixQRCode = ({ 
  pixKey, 
  recipientName, 
  city,
  cep,
  onCopy 
}: PixQRCodeProps) => {
  const [qrCodeData, setQrCodeData] = useState<string>('');
  const [pixPayload, setPixPayload] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        setError('');
        console.log('Gerando PIX com:', { pixKey, recipientName, city, cep });
        
        // Tentar gerar QR Code
        const qrCode = await PixService.generateQRCode({
          key: pixKey,
          name: recipientName,
          city,
          cep
        });
        
        // Tentar gerar payload
        const payload = PixService.generatePayload({
          key: pixKey,
          name: recipientName,
          city,
          cep
        });
        
        console.log('QR Code gerado com sucesso');
        console.log('Payload PIX:', payload);
        console.log('Payload length:', payload.length);
        
        setQrCodeData(qrCode);
        setPixPayload(payload);
      } catch (error) {
        console.error('Erro ao gerar QR Code PIX:', error);
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        setError(errorMessage);
        
        // Tentar gerar pelo menos o payload sem CEP como fallback
        try {
          console.log('Tentando gerar payload sem CEP...');
          const fallbackPayload = PixService.generatePayload({
            key: pixKey,
            name: recipientName,
            city
          });
          setPixPayload(fallbackPayload);
          console.log('Payload fallback gerado:', fallbackPayload);
        } catch (fallbackError) {
          console.error('Erro no fallback:', fallbackError);
        }
      }
    };

    generateQRCode();
  }, [pixKey, recipientName, city, cep]);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(pixKey);
    onCopy?.();
  };

  const handleCopyPixCode = () => {
    if (pixPayload) {
      navigator.clipboard.writeText(pixPayload);
      onCopy?.();
    }
  };

  return (
    <Card>
      <CardContent className="p-8 text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <QrCode className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-4">PIX - Escolha como pagar</h3>
        <p className="text-muted-foreground mb-6">
          Você pode escanear o QR Code, copiar o código PIX ou usar a chave diretamente
        </p>
        
        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6">
            <p className="text-sm font-medium">Erro ao gerar QR Code</p>
            <p className="text-xs mt-1">{error}</p>
            <p className="text-xs mt-2 text-muted-foreground">
              Use o botão "Copiar Código PIX" ou "Copiar Chave PIX" abaixo
            </p>
          </div>
        )}
        
        {!qrCodeData && !error && (
          <div className="bg-muted p-4 rounded-lg mb-6">
            <p className="text-sm">Gerando QR Code...</p>
          </div>
        )}
        
        {qrCodeData && !error && (
          <div className="bg-white p-4 rounded-lg inline-block mb-6">
            <img 
              src={qrCodeData} 
              alt="QR Code PIX" 
              className="w-48 h-48 mx-auto"
            />
          </div>
        )}

        <div className="space-y-3">
          {pixPayload && (
            <Button onClick={handleCopyPixCode} className="w-full" size="lg">
              Copiar Código PIX (Copia e Cola)
            </Button>
          )}
          
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">
              {pixPayload ? 'Ou use a Chave PIX diretamente' : 'Use a Chave PIX'}
            </p>
            <p className="font-mono text-sm font-semibold break-all">{pixKey}</p>
          </div>
          <Button onClick={handleCopyKey} variant="outline" className="w-full">
            Copiar Chave PIX
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
