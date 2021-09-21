import puppeteer from 'puppeteer';

jest.setTimeout(200000);

const width = 1400;
const height = 1000;

describe('A valid user can access peers tab', () => {
  let browser: any;
  let page: any;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      defaultViewport: {
        width,
        height
      }
    });
    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
  });

  afterAll(async () => {
    await browser.close();
  });

  test('user clicks on peers tab after login', async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector("input[name='email']");

    await page.click("input[name='email']");
    await page.type("input[name='email']", 'aqibmaqqbool@gmail.com');

    await page.click("input[name='password']");
    await page.type("input[name='password']", 'aqib1234');

    await page.click("button[type='submit']");

    await page.waitForSelector('#cohort-1');

    await page.evaluate(() => {
      document.getElementById('cohort-1')?.click();
    });

    await page.waitForSelector('#peers-1');

    await page.evaluate(() => {
      document.getElementById('peers-1')?.click();
    });

    await page.waitForSelector('#cohort-tab-title');

    const value = await page.evaluate(
      () => document.getElementById('cohort-tab-title')?.textContent
    );
    await expect(value).toContain('Peers');
  });
});
