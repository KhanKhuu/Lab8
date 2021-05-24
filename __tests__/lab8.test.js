describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/Lab8');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await Promise.all([
      page.waitForNavigation(),
      page.click('journal-entry')
    ]);
    expect(page.url().slice(page.url().length - 8)).toBe('/#entry1');
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    const tit = await page.evaluate(el => el.innerHTML, await page.$('h1')); // source: E. Fortes' answer at https://stackoverflow.com/questions/46431288/puppeteer-get-innerhtml 
    expect(tit).toBe('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
       */
      const entryPage = await page.$('entry-page')
      const entry = await entryPage.getProperty('entry');
      const contents = await entry.jsonValue();
      const expectedContents = { 
        title: 'You like jazz?',
        date: '4/25/2021',
        content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
        image: {
          src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
          alt: 'bee with sunglasses'
        }
      }
      expect(contents).toEqual(expectedContents);
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const bodyClass = await page.evaluate(el => el.className, await page.$('body')); // source: E. Fortes' answer at https://stackoverflow.com/questions/46431288/puppeteer-get-innerhtml 
    expect(bodyClass).toEqual('single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await Promise.all([
      page.waitForNavigation(),
      page.click('img')
    ]);
    expect(page.url().slice(page.url().length - 10)).toBe('/#settings');
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const tit = await page.evaluate(el => el.innerHTML, await page.$('h1')); // source: E. Fortes' answer at https://stackoverflow.com/questions/46431288/puppeteer-get-innerhtml 
    expect(tit).toBe('Settings');
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const bodyClass = await page.evaluate(el => el.className, await page.$('body')); // source: E. Fortes' answer at https://stackoverflow.com/questions/46431288/puppeteer-get-innerhtml 
    expect(bodyClass).toEqual('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    expect(page.url().slice(page.url().length - 8)).toBe('/#entry1');
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button, new URL should end with /Lab8/', async() => {
    await page.goBack();
    expect(page.url().slice(page.url().length - 6)).toBe('/Lab8/');
  });

  // define and implement test12: When the user is on the homepage, the header title should be “Journal Entries”
  it('Test12: On Settings page - checking page header title', async () => {
    const tit = await page.evaluate(el => el.innerHTML, await page.$('h1')); // source: E. Fortes' answer at https://stackoverflow.com/questions/46431288/puppeteer-get-innerhtml 
    expect(tit).toBe('Journal Entries');
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On the home page the <body> element should not have any class attribute ', async () => {
    const bodyClass = await page.evaluate(el => el.className, await page.$('body')); // source: E. Fortes' answer at https://stackoverflow.com/questions/46431288/puppeteer-get-innerhtml 
    expect(bodyClass).toEqual('');
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Verify the url is correct when clicking on the second entry', async () => {
    // implement test3: Clicking on the second journal entry should update the URL to contain “/#entry2”
    const entries = await page.$$('journal-entry');
    const [response] = await Promise.all([
      page.waitForNavigation(),
      entries[1].click()
    ]);
    expect(page.url().slice(page.url().length - 8)).toBe('/#entry2');
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Verify the title is current when clicking on the second entry', async () => {
    // Clicking on the second journal entry should update the header text to “Entry 2” 
    const tit = await page.evaluate(el => el.innerHTML, await page.$('h1')); // source: E. Fortes' answer at https://stackoverflow.com/questions/46431288/puppeteer-get-innerhtml 
    expect(tit).toBe('Entry 2');
  });

  // define and implement test16: Verify the entry page contents are correct when clicking on the second entry
  it('Test16: On second Entry page - checking <entry-page> contents', async () => {
     //implement test5: Clicking on the second journal entry should contain the following contents: 
      const entryPage = await page.$('entry-page')
      const entry = await entryPage.getProperty('entry');
      const contents = await entry.jsonValue();
      const expectedContents = { 
        title: 'Run, Forrest! Run!',
        date: '4/26/2021',
        content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
        image: {
          src: 'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg',
          alt: 'forrest running'
        }
      }
      expect(contents).toEqual(expectedContents);
  }, 10000);

  // create your own test 17: Verify clicking page title takes us home
  it('Test17: Verify the url is correct when clicking on the second entry', async () => {
    // implement test3: Clicking on the second journal entry should update the URL to contain “/#entry2”
    const title = await page.$('h1');
    const [response] = await Promise.all([
      page.waitForNavigation(),
      title.click()
    ]);
    expect(page.url().slice(page.url().length - 6)).toBe('/Lab8/');
  });

  // create your own test 18
  it('Test18: After clicking on the fourth entry, body class should be single-entry', async () => {
    // Clicking on the third journal entry should update the body class to single-entry 
    const entries = await page.$$('journal-entry');
    const [response] = await Promise.all([
      page.waitForNavigation(),
      entries[3].click()
    ]);
    const bodyClass = await page.evaluate(el => el.className, await page.$('body')); // source: E. Fortes' answer at https://stackoverflow.com/questions/46431288/puppeteer-get-innerhtml 
    expect(bodyClass).toEqual('single-entry');
  });

  // create your own test 19
  it('Test19: Fourth Entry should have an audio element', async () => {
    // The fourth entry should have an audio element
    const entryPage = await page.$('entry-page')
    const entry = await entryPage.getProperty('entry');
    const contents = await entry.jsonValue();
    expect(contents['audio']).not.toBeFalsy();
  });

  // create your own test 20
    it('Test20: Fourth Entry image alt should be harry looking up at the sorting hat', async () => {
    // The fourth entry image alt should be harry looking up at the sorting hat
    const entryPage = await page.$('entry-page')
    const entry = await entryPage.getProperty('entry');
    const contents = await entry.jsonValue();
    expect(contents['image']['alt']).toEqual('harry looking up at the sorting hat');
  });
});
