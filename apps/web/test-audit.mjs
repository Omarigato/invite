import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';
const results = [];

async function audit() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  const pages = [
    { name: 'Landing', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: 'Templates', url: '/templates' },
    { name: 'Terms', url: '/terms' },
    { name: 'Text Generator', url: '/tools/text-generator' },
    { name: 'Create', url: '/create' },
    { name: 'Theme Floral', url: '/theme/floral' },
    { name: 'Theme Daylight', url: '/theme/daylight' },
    { name: 'Theme Altyn', url: '/theme/altyn' },
    { name: 'Theme Kazakh', url: '/theme/kazakh' },
    { name: 'Invitation Demo', url: '/i/RwjAiGGE' },
  ];

  for (const p of pages) {
    try {
      const resp = await page.goto(`${BASE}${p.url}`, { waitUntil: 'networkidle', timeout: 10000 });
      const status = resp?.status() || 'no response';
      const title = await page.title();
      const bodyText = await page.locator('body').innerText().catch(() => '');
      const hasError = bodyText.includes('Error') || bodyText.includes('error') || bodyText.includes('404');
      const links = await page.locator('a[href]').count();
      const buttons = await page.locator('button').count();
      const images = await page.locator('img').count();

      results.push({
        page: p.name,
        url: p.url,
        status,
        title,
        textLength: bodyText.length,
        hasError,
        links,
        buttons,
        images,
        textPreview: bodyText.substring(0, 200).replace(/\n/g, ' '),
      });
    } catch (e) {
      results.push({
        page: p.name,
        url: p.url,
        status: 'ERROR',
        error: e.message.substring(0, 200),
      });
    }
  }

  // Test clicking links on landing page
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 10000 });

  // Click language switcher
  const langBtn = page.locator('button:has-text("KZ")');
  if (await langBtn.count() > 0) {
    await langBtn.click();
    results.push({ page: 'Action', action: 'Click KZ lang', result: 'OK' });
  }

  // Click dark mode
  const darkBtn = page.locator('button:has-text("🌙")');
  if (await darkBtn.count() > 0) {
    await darkBtn.click();
    const isDark = await page.locator('html').getAttribute('class');
    results.push({ page: 'Action', action: 'Toggle dark mode', result: isDark?.includes('dark') ? 'DARK ON' : 'DARK OFF' });
  }

  // Check design showcase links
  const designLinks = page.locator('a[href^="/theme/"]');
  const designCount = await designLinks.count();
  results.push({ page: 'Action', action: 'Design links found', result: designCount });

  // Check category grid links
  const catLinks = page.locator('a[href^="/templates/"]');
  const catCount = await catLinks.count();
  results.push({ page: 'Action', action: 'Category links found', result: catCount });

  // Navigate to blog and check posts
  await page.goto(`${BASE}/blog`, { waitUntil: 'networkidle', timeout: 10000 });
  const blogLinks = page.locator('a[href^="/blog/"]');
  const blogCount = await blogLinks.count();
  results.push({ page: 'Action', action: 'Blog post links found', result: blogCount });

  // Click first blog post
  if (blogCount > 0) {
    await blogLinks.first().click();
    await page.waitForLoadState('networkidle');
    const blogTitle = await page.locator('h1').first().innerText().catch(() => 'none');
    results.push({ page: 'Action', action: 'Navigate to blog post', result: blogTitle });
  }

  // Check text generator form
  await page.goto(`${BASE}/tools/text-generator`, { waitUntil: 'networkidle', timeout: 10000 });
  const inputs = await page.locator('input').count();
  const selects = await page.locator('select').count();
  results.push({ page: 'Action', action: 'Text generator form', result: `inputs:${inputs} selects:${selects}` });

  // Check invitation page
  await page.goto(`${BASE}/i/RwjAiGGE`, { waitUntil: 'networkidle', timeout: 10000 });
  const hasRsvpForm = await page.locator('input[placeholder*="имя"]').count();
  const hasCountdown = await page.locator('text=Дней').count();
  results.push({ page: 'Action', action: 'Invitation page', result: `rsvp:${hasRsvpForm} countdown:${hasCountdown}` });

  await browser.close();

  console.log('\n=== AUDIT RESULTS ===\n');
  for (const r of results) {
    if (r.action) {
      console.log(`[ACTION] ${r.action}: ${r.result}`);
    } else {
      console.log(`[${r.status}] ${r.page} (${r.url})`);
      console.log(`  Title: ${r.title}`);
      console.log(`  Text: ${r.textLength} chars | Links: ${r.links} | Buttons: ${r.buttons} | Images: ${r.images}`);
      if (r.hasError) console.log(`  ⚠️  HAS ERROR`);
      if (r.error) console.log(`  ❌ ${r.error}`);
      console.log(`  Preview: ${r.textPreview?.substring(0, 120)}...`);
      console.log('');
    }
  }
}

audit().catch(console.error);
