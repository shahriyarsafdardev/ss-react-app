import puppeteer from 'puppeteer';

jest.setTimeout(200000);

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

    let value = await page.evaluate(() => document.getElementById('cohort-tab-title')?.textContent);
    await expect(value).toContain('Peers');

    // test grid view
    value = await page.evaluate(
      () => document.getElementById('peer-grid-container')?.children?.length
    );
    await expect(value).toBe(3);

    const { fullName, currentPosition, imgUrl } = await page.evaluate(() => {
      const value = document.getElementById('peer-grid-1');
      const el: any = value?.children[0]?.children[2];

      return {
        fullName: value?.children[1]?.textContent,
        currentPosition: value?.children[2]?.textContent,
        imgUrl: el?.src
      };
    });
    await expect(fullName).toContain('Alex Morris');
    await expect(currentPosition).toContain('Product Designer');
    await expect(imgUrl).toContain(
      'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f8e0dbed-48c7-4b17-908b-618b271b52dd/1516925807774.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210919%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210919T205726Z&X-Amz-Expires=86400&X-Amz-Signature=75fd4fce726a9c386f3142d2dceb352bad9e9d27f4bee587d5b39b07aa4bc5c6&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%221516925807774.jpeg%22'
    );

    // test  list view
    await page.click('#select-view');
    await page.click('#table-view');

    value = await page.evaluate(
      () => document.getElementById('peer-list-container')?.children?.length
    );
    await expect(value).toBe(3);
    const { name, companyName, currentRole, strength, interest } = await page.evaluate(() => {
      const value = document.getElementById('peer-list-container')?.children[0];
      return {
        name: value?.children[0]?.textContent,
        companyName: value?.children[1]?.textContent,
        currentRole: value?.children[2]?.textContent,
        strength: value?.children[3]?.textContent,
        interest: value?.children[4]?.textContent
      };
    });
    await expect(name).toContain('Morris');
    await expect(companyName).toContain('Upwork');
    await expect(currentRole).toContain('Product Designer');
    await expect(strength).toContain('Design Thinking');
    await expect(interest).toContain('Networking');

    // test modal
    const { modalCompanyName, modalEmail, modalStrength, modalInterest } = await page.evaluate(
      () => {
        document.getElementById('student-row-1')?.click();
        const value = document.getElementById('student-modal')?.children[0];
        return {
          modalCompanyName: value?.children[1]?.textContent,
          modalEmail: value?.children[2]?.textContent,
          modalInterest: value?.children[3].children[2].children[0].textContent,
          modalStrength: value?.children[4].children[2].children[0].textContent
        };
      }
    );
    await expect(modalEmail).toContain('alexmorris@upwork.com');
    await expect(modalCompanyName).toContain('Upwork');
    await expect(modalStrength).toContain('Design Thinking');
    await expect(modalInterest).toContain('Networking');
  });
});
