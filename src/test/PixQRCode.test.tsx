import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { PixQRCode } from '../components/PixQRCode';
import { PixService } from '../services/PixService';

// Mock do PixService
vi.mock('../services/PixService', () => ({
  PixService: {
    generateQRCode: vi.fn(),
    generatePayload: vi.fn(),
  },
}));

const mockProps = {
  pixKey: '+5521981352026',
  recipientName: 'LEONARDO ALEX TEIXEIRA',
  city: 'MESQUITA',
  cep: '26551040',
};

describe('PixQRCode', () => {
  it('deve renderizar o QR Code quando gerado com sucesso', async () => {
    const mockQRCode = 'data:image/png;base64,mockQRCodeData';
    const mockPayload = 'mockPixPayload123';
    vi.mocked(PixService.generateQRCode).mockResolvedValue(mockQRCode);
    vi.mocked(PixService.generatePayload).mockReturnValue(mockPayload);

    render(<PixQRCode {...mockProps} />);

    await waitFor(() => {
      const qrImage = screen.getByAltText('QR Code PIX');
      expect(qrImage).toBeInTheDocument();
      expect(qrImage).toHaveAttribute('src', mockQRCode);
    });
  });

  it('deve exibir erro quando falhar ao gerar QR Code', async () => {
    vi.mocked(PixService.generateQRCode).mockRejectedValue(
      new Error('Erro ao gerar QR Code')
    );

    render(<PixQRCode {...mockProps} />);

    await waitFor(() => {
      const errorMessages = screen.getAllByText('Erro ao gerar QR Code');
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });

  it('deve exibir a chave PIX corretamente', async () => {
    const mockQRCode = 'data:image/png;base64,test';
    const mockPayload = 'mockPixPayload123';
    vi.mocked(PixService.generateQRCode).mockResolvedValue(mockQRCode);
    vi.mocked(PixService.generatePayload).mockReturnValue(mockPayload);

    render(<PixQRCode {...mockProps} />);

    await waitFor(() => {
      const qrImage = screen.getByAltText('QR Code PIX');
      expect(qrImage).toBeInTheDocument();
    });

    // Verifica que a chave PIX está visível
    expect(screen.getByText(mockProps.pixKey)).toBeInTheDocument();
  });

  it('deve exibir loading state inicialmente', () => {
    vi.mocked(PixService.generateQRCode).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    render(<PixQRCode {...mockProps} />);

    expect(screen.getByText(/Gerando QR Code/i)).toBeInTheDocument();
  });

  it('deve renderizar botão de copiar payload', async () => {
    const mockQRCode = 'data:image/png;base64,test';
    const mockPayload = 'payload123';
    vi.mocked(PixService.generateQRCode).mockResolvedValue(mockQRCode);
    vi.mocked(PixService.generatePayload).mockReturnValue(mockPayload);

    render(<PixQRCode {...mockProps} />);

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /Copiar Código PIX/i })
      ).toBeInTheDocument();
    });
  });
});
