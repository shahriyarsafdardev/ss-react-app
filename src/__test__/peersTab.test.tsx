import puppeteer from 'puppeteer';
import { sign } from '../utils/jwt';
import mock from './api/mockedAxios';
// jest.setTimeout(10000);

const JWT_SECRET = 'minimal-secret-key';
const JWT_EXPIRES_IN = '5 days';

const users = [
  {
    id: '8864c717-587d-472a-929a-8e5f298024da-1',
    first_name: 'Aqib',
    last_name: 'Maqbool',
    email: 'aqibmaqqbool@gmail.com',
    password: 'aqib1234',
    profile_image_url: '/static/mock-images/avatars/avatar_default.jpg',
    phoneNumber: '+40 777666555',
    country: 'United States',
    address: '90210 Broadway Blvd',
    state: 'California',
    city: 'San Francisco',
    zipCode: '94116',
    about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
    role: 'admin',
    isPublic: true
  }
];

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

  // afterAll(async () => {
  //   await browser.close();
  // });
  test('successful login with valid credentials', async () => {
    mock.onPost('/api/account/login').reply(async (config) => {
      try {
        // await fakeRequest(1000);

        const { email, password } = JSON.parse(config.data);
        const user = users.find((_user) => _user.email === email);

        if (!user) {
          return [400, { message: 'There is no user corresponding to the email address.' }];
        }

        if (user.password !== password) {
          return [400, { message: 'Wrong password' }];
        }

        const accessToken = sign({ userId: user.id }, JWT_SECRET, {
          expiresIn: JWT_EXPIRES_IN
        });

        return [200, { accessToken, user }];
      } catch (error) {
        console.error(error);
        return [500, { message: 'Internal server error' }];
      }
    });

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
