// Teste para verificar se o QR Code PIX está sendo gerado corretamente
import { QrCodePix } from 'qrcode-pix';

const testPixData = {
  version: '01',
  key: '5521981352026',
  name: 'LEONARDO ALEX TEIXEIRA',  // 25 caracteres exatos
  city: 'MESQUITA',
  cep: '26551040',
  transactionId: 'CASAMENTO2026'
};

console.log('Testando dados PIX:');
console.log('Nome length:', testPixData.name.length);
console.log('Dados:', testPixData);

try {
  const qrCodePix = QrCodePix(testPixData);
  const payload = qrCodePix.payload();
  console.log('✅ Payload gerado com sucesso!');
  console.log('Payload:', payload);
  
  qrCodePix.base64().then(base64 => {
    console.log('✅ QR Code base64 gerado com sucesso!');
    console.log('Base64 length:', base64.length);
  }).catch(err => {
    console.error('❌ Erro ao gerar base64:', err);
  });
} catch (error) {
  console.error('❌ Erro ao criar PIX:', error);
}
