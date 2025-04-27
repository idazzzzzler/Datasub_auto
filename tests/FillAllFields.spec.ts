import { test, expect } from '@playwright/test';
import { QuotePage } from '../lib/Pages/Quote';

test('Send form with filled fields', async ({ page }) => {
    const quote = new QuotePage(page);

    await quote.goToQuotePage();
    await quote.fillName('Name');
    await quote.fillEmail('example@gmail.com');
    await quote.selectServiveOption('Service 1');
    await quote.fillMessage('Some test message');
    const responsePromise = page.waitForResponse(response => 
        response.url() === 'https://example.com/api/send-quote' && 
        response.request().method() === 'POST'
      );
    await quote.formSubmitBtn.click();
    const response = await responsePromise;

    await expect(page.locator('#quoteStatus', { hasText: 'Форма отправлена успешно!' })).toBeVisible();
    expect(response.status()/100).toBeLessThan(4);
});
