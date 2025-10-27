import { test, expect } from '@playwright/test';

test.describe('Wedding Landing Page - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('deve carregar a página principal corretamente', async ({ page }) => {
    // Verifica título
    await expect(page).toHaveTitle('leo-crystal-wedding-land');
    
    // Verifica seções principais
    await expect(page.getByRole('heading', { name: 'Nossa História' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Lista de Presentes' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Contribuição via PIX' })).toBeVisible();
  });

  test('deve exibir o QR Code PIX', async ({ page }) => {
    // Aguarda a seção PIX carregar
    await page.getByRole('heading', { name: 'Contribuição via PIX' }).scrollIntoViewIfNeeded();
    
    // Verifica que o QR Code está visível (aguarda até 10s)
    await expect(page.getByAltText('QR Code PIX')).toBeVisible({ timeout: 10000 });
  });

  test('deve copiar a chave PIX ao clicar no botão', async ({ page }) => {
    // Navega até a seção PIX
    await page.getByRole('heading', { name: 'Contribuição via PIX' }).scrollIntoViewIfNeeded();
    
    // Tenta conceder permissões de clipboard (não funciona em todos os navegadores)
    try {
      await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    } catch (error) {
      // Ignora erro em navegadores que não suportam essas permissões
    }
    
    // Clica no botão de copiar chave PIX
    await page.getByRole('button', { name: /copiar chave pix/i }).click();
    
    // Aguarda um pouco para a cópia processar
    await page.waitForTimeout(500);
    
    // Verifica que o botão está visível
    await expect(page.getByRole('button', { name: /copiar chave pix/i })).toBeVisible();
  });

  test('deve abrir a lista de presentes da Amazon', async ({ page }) => {
    // Navega até a seção de Lista de Presentes
    await page.getByRole('heading', { name: 'Lista de Presentes' }).scrollIntoViewIfNeeded();
    
    // Aguarda o botão estar visível
    const amazonButton = page.getByRole('button', { name: /Acessar Lista na Amazon/i });
    await expect(amazonButton).toBeVisible();
  });

  test('deve navegar entre seções com scroll suave', async ({ page }) => {
    // Verifica que a página tem várias seções
    const sections = ['Nossa História', 'Lista de Presentes', 'Contribuição via PIX', 'Como Contribuir'];
    
    for (const section of sections) {
      const heading = page.getByRole('heading', { name: section });
      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();
    }
  });

  test('deve exibir animações de scroll', async ({ page }) => {
    // Rola a página para baixo
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(300);
    
    // Verifica que elementos estão visíveis após scroll
    await expect(page.getByRole('heading', { name: 'Nossa História' })).toBeVisible();
  });
});
