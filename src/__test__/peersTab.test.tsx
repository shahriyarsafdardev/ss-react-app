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

    await page.waitForSelector('#peers-2');

    await page.evaluate(() => {
      document.getElementById('peers-2')?.click();
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
      'https://media-exp1.licdn.com/dms/image/C5103AQFUWNtSayYCFA/profile-displayphoto-shrink_800_800/0/1516925807774?e=1637798400&v=beta&t=iqk1HIMxR-tRqnjCjLnX1GnpfKQ1VHTrFnjUACGvLFs'
    );

    // test  list view
    await page.click('#select-view');
    await page.click('#table-view');

    value = await page.evaluate(
      () => document.getElementById('peer-list-container')?.children?.length
    );
    await expect(value).toBe(3);

    const { name, companyName, currentRole, strength, interest, profileImageUrl } =
      await page.evaluate(() => {
        const el: any =
          document.getElementById('peer-list-container')?.children[0].children[0].children[0]
            .children[0]?.children[0];
        const value = document.getElementById('peer-list-container')?.children[0];

        return {
          name: value?.children[0]?.textContent,
          companyName: value?.children[1]?.textContent,
          currentRole: value?.children[2]?.textContent,
          strength: value?.children[3]?.textContent,
          interest: value?.children[4]?.textContent,
          profileImageUrl: el?.src
        };
      });
    await expect(name).toContain('Morris');
    await expect(companyName).toContain('Upwork');
    await expect(currentRole).toContain('Product Designer');
    await expect(strength).toContain('Design Thinking');
    await expect(interest).toContain('Networking');
    await expect(profileImageUrl).toContain(
      'https://media-exp1.licdn.com/dms/image/C5103AQFUWNtSayYCFA/profile-displayphoto-shrink_800_800/0/1516925807774?e=1637798400&v=beta&t=iqk1HIMxR-tRqnjCjLnX1GnpfKQ1VHTrFnjUACGvLFs'
    );

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
    // close modal
    await page.evaluate(() =>
      document.querySelector('[data-testid=modal-test-id]')?.parentElement?.click()
    );
  });
});
