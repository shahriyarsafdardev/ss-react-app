import puppeteer from 'puppeteer';

jest.setTimeout(200000);

const width = 1400;
const height = 1000;

const OPEN_BROWSER = false;

describe(`A valid user can access Session tab's feature`, () => {
  let browser: any;
  let page: any;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: !OPEN_BROWSER,
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

  test('User can click on session tab under cohorts section', async () => {
    await page.waitForSelector('#cohort-1');

    await page.evaluate(() => {
      document.getElementById('cohort-1')?.click();
    });

    await page.waitForSelector('#sessions-0');

    await page.evaluate(() => {
      document.getElementById('sessions-0')?.click();
    });

    await page.waitForSelector('[data-session-title]');

    const sessionTitle = await page.evaluate(
      () => document.querySelector('[data-session-title]')?.textContent
    );

    expect(sessionTitle).toBe('Network Effects and Economics of Digital Platforms');
  });

  test('Description section contains correct data', async () => {
    await page.waitForSelector('#session-description');

    const sessionDescription = await page.evaluate(
      () => document.getElementById('session-description')?.textContent
    );

    expect(sessionDescription).toContain('About First Session');
  });

  test('Navigation among sessions through side list is working', async () => {
    await page.waitForSelector('[data-session-row]');

    // make assertions about title and description of second session
    await page.evaluate(() => {
      document.querySelectorAll('[data-session-row]')[1].click();
    });

    await page.waitForSelector('[data-session-title]');

    let session = await page.evaluate(() => ({
      title: document.querySelector('[data-session-title]')?.textContent,
      description: document.getElementById('session-description')?.textContent
    }));

    expect(session.title).toBe('Session number 2 testing');
    expect(session.description).toContain('About Second Session');

    // make assertions about title and description of third session
    await page.evaluate(() => {
      document.querySelectorAll('[data-session-row]')[2].click();
    });

    await page.waitForSelector('[data-session-title]');

    session = await page.evaluate(() => ({
      title: document.querySelector('[data-session-title]')?.textContent,
      description: document.getElementById('session-description')?.textContent
    }));

    expect(session.title).toBe('Session number 3 testing');
    expect(session.description).toContain('About Third Session');
  });
});
