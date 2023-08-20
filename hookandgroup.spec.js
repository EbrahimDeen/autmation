const { test, expect } = require('@playwright/test')
const data =require( '../tests/data.js')

console.log(data);
test.beforeEach(async ({ page }) => {
    await page.goto(data.gotoURL);
});


test('get started link', async ({ page }) => {
    

    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*intro/);
});
