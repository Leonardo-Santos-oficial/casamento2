import { QrCodePix } from 'qrcode-pix';

interface PixGeneratorParams {
  key: string;
  name: string;
  city: string;
  cep?: string;
  amount?: number;
  message?: string;
}

export class PixService {
  private static sanitizeName(name: string): string {
    // Remove acentos e caracteres especiais, converte para maiúsculas
    const normalized = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
      .replace(/[^A-Z0-9\s]/g, '');
    
    // Limite de 25 caracteres
    return normalized.length > 25 ? normalized.substring(0, 25).trim() : normalized;
  }

  private static sanitizeCity(city: string): string {
    // Remove acentos, converte para maiúsculas
    return city
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
      .replace(/[^A-Z\s]/g, '')
      .trim();
  }

  private static formatPixKey(key: string): string {
    const cleanKey = key.trim();
    
    // Se for telefone sem +55, adiciona
    if (/^\d{11,13}$/.test(cleanKey.replace(/\D/g, ''))) {
      const digits = cleanKey.replace(/\D/g, '');
      if (!digits.startsWith('55')) {
        return `+55${digits}`;
      }
      return `+${digits}`;
    }
    
    return cleanKey;
  }

  static async generateQRCode(params: PixGeneratorParams): Promise<string> {
    const { key, name, city, cep, amount, message } = params;
    
    const sanitizedName = this.sanitizeName(name);
    const sanitizedCity = this.sanitizeCity(city);
    const formattedKey = this.formatPixKey(key);
    
    console.log('PixService - Dados sanitizados:', {
      key: formattedKey,
      name: sanitizedName,
      nameLength: sanitizedName.length,
      city: sanitizedCity,
      cep: cep?.replace(/\D/g, ''),
      transactionId: 'CASAMENTO2026'
    });
    
    const qrCodePix = QrCodePix({
      version: '01',
      key: formattedKey,
      name: this.sanitizeName(name),
      city: this.sanitizeCity(city),
      transactionId: 'CASAMENTO2026',
      ...(cep && { cep: cep.replace(/\D/g, '') }),
      ...(message && { message: message.substring(0, 72) }),
      ...(amount && { value: amount })
    });

    return await qrCodePix.base64();
  }

  static generatePayload(params: PixGeneratorParams): string {
    const { key, name, city, cep, amount, message } = params;
    
    const sanitizedName = this.sanitizeName(name);
    const sanitizedCity = this.sanitizeCity(city);
    const formattedKey = this.formatPixKey(key);
    
    const qrCodePix = QrCodePix({
      version: '01',
      key: formattedKey,
      name: this.sanitizeName(name),
      city: this.sanitizeCity(city),
      transactionId: 'CASAMENTO2026',
      ...(cep && { cep: cep.replace(/\D/g, '') }),
      ...(message && { message: message.substring(0, 72) }),
      ...(amount && { value: amount })
    });

    return qrCodePix.payload();
  }
}
