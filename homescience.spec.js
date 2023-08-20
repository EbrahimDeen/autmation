const { test, expect } = require('@playwright/test');
const data = require('../tests/dataConfig.js')

test('auther select from post page', async ({ page }) => {


    await page.goto('https://www.buna.co');
    await page.pause();

  // Find all links on the page
  const allLinks = await page.$$('a');
  console.log(allLinks.length + ' Total number of links present');

  let bCount = 0;
  let vCount = 0;
  var response="";
  // Loop through each link and check if it is valid or broken
  for (let i = 0; i < allLinks.length; i++) {
    const link = allLinks[i];
    const url = await link.getAttribute('href');

    // Check if the link is valid
    try {
       response = await page.goto(url, { timeout: 5000 });
    } catch (err) {
      // Do nothing
    }

    // Count valid and broken links
    if (response.status() >= 400) {
      console.log(url + ' Broken link');
      bCount++;
    } else {
      vCount++;
    }
  }

  console.log('Broken link count: ' + bCount);
  console.log('Valid link count: ' + vCount);

});