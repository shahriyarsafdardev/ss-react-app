import puppeteer from 'puppeteer';

jest.setTimeout(200000);

const width = 1400;
const height = 1000;

describe('A valid user can access sessions tab', () => {
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
    await page.setDefaultNavigationTimeout(0);
  });

  afterAll(async () => {
    await browser.close();
  });

  test('When a user login with valid credentials', async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector("input[name='email']");

    await page.click("input[name='email']");
    await page.type("input[name='email']", 'aqibmaqqbool@gmail.com');

    await page.click("input[name='password']");
    await page.type("input[name='password']", 'aqib1234');

    await page.click("button[type='submit']");
  });

  test('user can click on session tab under cohorts section', async () => {
    await page.waitForSelector('#cohort-1');

    await page.evaluate(() => {
      document.getElementById('cohort-1')?.click();
    });

    await page.waitForSelector('#sessions-0');

    await page.evaluate(() => {
      document.getElementById('sessions-0')?.click();
    });

    await page.waitForSelector('[data-name]');

    const sessionTitle = await page.evaluate(
      () => document.querySelector('[data-name]')?.textContent
    );

    expect(sessionTitle).toBe('Network Effects and Economics of Digital Platforms');
  });
});
