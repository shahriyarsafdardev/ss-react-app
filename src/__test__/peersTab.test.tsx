import puppeteer from 'puppeteer';

jest.setTimeout(36000);

const width = 1400;
const height = 1000;

describe('A valid user can access peers tab', () => {
  let browser: any;
  let page: any;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: {
        width,
        height
      }
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('successful login with valid credentials', async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector("input[name='email']");

    await page.click("input[name='email']");
    await page.type("input[name='email']", 'aqibmaqqbool@gmail.com');

    await page.click("input[name='password']");
    await page.type("input[name='password']", 'aqib1234');

    await page.click("button[type='submit']");

    await page.waitForSelector('#cohort-2');

    await page.evaluate(() => {
      document.getElementById('cohort-2')?.click();
    });

    await page.waitForSelector('#peers-0');

    await page.evaluate(() => {
      document.getElementById('peers-0')?.click();
    });

    await page.waitForSelector('#cohort-tab-title');

    const value = await page.evaluate(
      () => document.getElementById('cohort-tab-title')?.children[0].textContent
    );
    await expect(value).toContain('Peers Tab');
  });
});
