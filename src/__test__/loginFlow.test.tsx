import puppeteer from "puppeteer";

let browser:any;
let page:any;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
});

test('it performs a user login', async () => {

  await page.goto("http://localhost:3000/dashboard");
  await page.waitForSelector("input[name='email']");

  await page.click("input[name='email']");
  await page.type("input[name='email']", "aqibmaqqbool@gmail.com");

  await page.click("input[name='password']");
  await page.type("input[name='password']", "aqib1234");

  await page.click("button[type='submit']");
  });
