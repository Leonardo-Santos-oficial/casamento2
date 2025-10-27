import { test, expect } from '@playwright/test';

test.describe('Responsive - Desktop', () => {
  test('deve carregar corretamente no desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    await expect(page.getByRole('heading', { name: 'Nossa História' })).toBeVisible({ timeout: 10000 });
  });

  test('deve exibir navegação completa no desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    const sections = ['Nossa História', 'Lista de Presentes', 'Contribuição via PIX'];
    
    for (const section of sections) {
      const heading = page.getByRole('heading', { name: section });
      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();
    }
  });
});

test.describe('Responsive - Tablet', () => {
  test('deve carregar corretamente no tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    await expect(page.getByRole('heading', { name: 'Nossa História' })).toBeVisible({ timeout: 10000 });
  });

  test('deve permitir interação com botões no tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    await page.getByRole('heading', { name: 'Contribuição via PIX' }).scrollIntoViewIfNeeded();
    
    const pixButton = page.getByRole('button', { name: /copiar chave pix/i });
    await expect(pixButton).toBeVisible();
    await expect(pixButton).toBeEnabled();
  });
});

test.describe('Responsive - Mobile', () => {
  test('deve carregar corretamente no mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    await expect(page.getByRole('heading', { name: 'Nossa História' })).toBeVisible({ timeout: 10000 });
  });

  test('deve exibir QR Code no mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    await page.getByRole('heading', { name: 'Contribuição via PIX' }).scrollIntoViewIfNeeded();
    
    const qrCode = page.getByAltText('QR Code PIX');
    await expect(qrCode).toBeVisible({ timeout: 10000 });
    
    const boundingBox = await qrCode.boundingBox();
    expect(boundingBox).not.toBeNull();
    expect(boundingBox!.width).toBeGreaterThan(0);
    expect(boundingBox!.height).toBeGreaterThan(0);
  });
});
