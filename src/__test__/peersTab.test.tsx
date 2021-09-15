import puppeteer from 'puppeteer';

jest.setTimeout(10000);

describe('A valid user can access peers tab', () => {
  let browser: any;
  let page: any;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
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

    const [button] = await page.$x("//div[contains(., 'my sample cohort')]");
    if (button) {
      await button.click();
    }

    // testing in progress
  });
});
