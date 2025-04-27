import { test, expect } from '@playwright/test';
import { QuotePage } from '../lib/Pages/Quote';

test('Send form with filled fields', async ({ page }) => {
    const quote = new QuotePage(page);

    await quote.goToQuotePage();
    await quote.fillName('Name');
    await quote.selectServiveOption('Service 2');
    await quote.fillMessage('Some test message');
    await quote.formSubmitBtn.click();
    
    await expect(quote.formEmail).toHaveClass(/is-invalid/);
    await expect(page.locator('#quoteStatus', { hasText: 'Форма отправлена успешно!' })).not.toBeVisible();
});
