import puppeteer from 'puppeteer';

jest.setTimeout(36000);

describe('When user tries to login', () => {
  let browser: any;
  let page: any;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('unsuccessful login with invalid credentials', async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector("input[name='email']");

    await page.click("input[name='email']");
    await page.type("input[name='email']", 'aqibmaqqbool@gmail.com');

    await page.click("input[name='password']");
    await page.type("input[name='password']", 'wrongPass');

    await page.click("button[type='submit']");

    await page.waitForSelector('.MuiAlert-standardError');

    const element = await page.$('.MuiAlert-standardError');
    const value = await page.evaluate((el: any) => el.textContent, element);
    console.log(value);
    await expect(value).toContain('Wrong password');
  });

  test('successful login with valid credentials', async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector("input[name='email']");

    await page.click("input[name='email']");
    await page.type("input[name='email']", 'aqibmaqqbool@gmail.com');

    await page.click("input[name='password']");
    await page.type("input[name='password']", "aqib1234");

    await page.click("button[type='submit']");

    await page.waitForSelector('#user-title');
    let element = await page.$('#user-title');
    let value = await page.evaluate((el: any) => el.textContent, element);

    await page.goto('http://localhost:3000/'); // Reload page to verify user persistence

    await page.waitForSelector('#user-title');
    element = await page.$('#user-title');

    value = await page.evaluate((el: any) => el.textContent, element);

    await expect(value).toContain('Welcome back, Aqib Maqbool!');
  });
});
