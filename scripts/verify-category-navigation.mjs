import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://localhost:3100';
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
try {
  for (const width of [1280, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(`${base}/projects?category=kitchen#projects`, { waitUntil: 'domcontentloaded' });
    const filters = page.getByRole('navigation', { name: 'Filter by service' });
    for (const [label, category] of [['Bathroom', 'bathroom'], ['Commercial', 'commercial'], ['Kitchen', 'kitchen'], ['All', null]]) {
      await filters.getByRole('link', { name: label, exact: true }).click();
      await page.waitForURL(url => url.searchParams.get('category') === category);
      await filters.locator('a[aria-current="page"]').filter({ hasText: new RegExp(`^${label}$`) }).waitFor();
      assert.equal(await page.locator('div[aria-hidden="true"][class*="z-[200]"]').count(), 0, `${width}px: ${label} left a transition curtain`);
    }
    await page.goto(`${base}/gallery?category=kitchen#gallery`, { waitUntil: 'domcontentloaded' });
    await filters.getByRole('link', { name: 'Bathroom', exact: true }).click();
    await page.waitForURL(url => url.searchParams.get('category') === 'bathroom');
    assert.equal(await page.locator('div[aria-hidden="true"][class*="z-[200]"]').count(), 0);
    await page.goto(`${base}/about`, { waitUntil: 'domcontentloaded' });
    await page.locator('#about-service-trigger-02').click();
    await page.locator('#about-service-panel-02').getByRole('link', { name: 'View Projects', exact: true }).click();
    await page.waitForURL('**/projects?category=kitchen#projects');
    await page.waitForFunction(() => !document.querySelector('div[aria-hidden="true"][class*="z-[200]"]'));
    await filters.waitFor();
    assert.equal((await filters.locator('a[aria-current="page"]').textContent()).trim(), 'Kitchen');
    await page.close();
  }
  console.log('Passed: project and gallery category clicks leave no curtain; About-to-project navigation reveals normally on desktop and mobile.');
} finally {
  await browser.close();
}
