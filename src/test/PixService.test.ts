import { describe, it, expect, beforeEach } from 'vitest';
import { PixService } from '../services/PixService';
import { WEDDING_INFO } from '../constants/wedding-info';

const mockParams = {
  key: WEDDING_INFO.pixKey,
  name: WEDDING_INFO.pixRecipientName,
  city: WEDDING_INFO.pixRecipientCity,
  cep: WEDDING_INFO.pixRecipientCep,
};

describe('PixService', () => {
  describe('generateQRCode', () => {
    it('deve gerar um QR Code válido em formato base64', async () => {
      const qrCode = await PixService.generateQRCode(mockParams);

      expect(qrCode).toBeDefined();
      expect(qrCode).toMatch(/^data:image\/png;base64,/);
    });

    it('deve gerar QR Code consistente para mesmos parâmetros', async () => {
      const qrCode1 = await PixService.generateQRCode(mockParams);
      const qrCode2 = await PixService.generateQRCode(mockParams);

      expect(qrCode1).toBe(qrCode2);
    });
  });

  describe('generatePayload', () => {
    it('deve gerar um payload PIX válido', async () => {
      const payload = await PixService.generatePayload(mockParams);

      expect(payload).toBeDefined();
      expect(typeof payload).toBe('string');
      expect(payload.length).toBeGreaterThan(0);
    });

    it('deve gerar payload consistente', async () => {
      const payload1 = await PixService.generatePayload(mockParams);
      const payload2 = await PixService.generatePayload(mockParams);

      expect(payload1).toBe(payload2);
    });

    it('deve conter informações essenciais do PIX', async () => {
      const payload = await PixService.generatePayload(mockParams);

      // Payload PIX geralmente contém informações específicas
      expect(payload).toContain('BR.GOV.BCB.PIX');
    });
  });

  describe('formatPixKey', () => {
    it('deve adicionar +55 quando não presente', () => {
      // Acessando método privado através de cast
      const formatted = (PixService as any).formatPixKey('21981352026');
      expect(formatted).toBe('+5521981352026');
    });

    it('deve manter +55 quando já presente', () => {
      const formatted = (PixService as any).formatPixKey('+5521981352026');
      expect(formatted).toBe('+5521981352026');
    });

    it('deve limpar caracteres especiais do telefone', () => {
      const formatted = (PixService as any).formatPixKey('(21) 98135-2026');
      expect(formatted).toBe('+5521981352026');
    });
  });

  describe('sanitizeName', () => {
    it('deve converter para maiúsculas', () => {
      const sanitized = (PixService as any).sanitizeName('leonardo alex');
      expect(sanitized).toBe('LEONARDO ALEX');
    });

    it('deve remover acentos', () => {
      const sanitized = (PixService as any).sanitizeName('José María');
      expect(sanitized).toBe('JOSE MARIA');
    });

    it('deve limitar a 25 caracteres', () => {
      const longName = 'Leonardo Alex Teixeira Santos Silva';
      const sanitized = (PixService as any).sanitizeName(longName);
      expect(sanitized.length).toBeLessThanOrEqual(25);
    });

    it('deve manter formatação básica', () => {
      const sanitized = (PixService as any).sanitizeName('Leonardo  Alex   Teixeira');
      expect(sanitized).toBe('LEONARDO  ALEX   TEIXEIRA');
      expect(sanitized.length).toBeLessThanOrEqual(25);
    });
  });

  describe('sanitizeCity', () => {
    it('deve converter para maiúsculas', () => {
      const sanitized = (PixService as any).sanitizeCity('mesquita');
      expect(sanitized).toBe('MESQUITA');
    });

    it('deve remover acentos', () => {
      const sanitized = (PixService as any).sanitizeCity('São Paulo');
      expect(sanitized).toBe('SAO PAULO');
    });

    it('deve tratar strings vazias', () => {
      const sanitized = (PixService as any).sanitizeCity('');
      expect(sanitized).toBe('');
    });
  });
});
