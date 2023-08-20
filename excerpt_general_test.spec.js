const { test, expect } = require('@playwright/test');
const data = require('../tests/dataConfig.js')

test.beforeEach(async ({ page }) => {
    //variable initilizating 
    const login_XPath = "//input[@id='user_login']";
    const pass_Xpath = "//input[@id='user_pass']";


    //opening URL
    await page.goto(data.gotoURL)
    //here we check the page is open is correct 
    await expect.soft(page).toHaveTitle(data.loginTitle)
    //here we check the login and password field is present
    await expect.soft(page.locator(login_XPath)).toBeVisible();
    await expect.soft(page.locator(pass_Xpath)).toBeVisible();
    await expect.soft(page.locator("//input[@id='wp-submit']")).toBeVisible();
    //here we check the element is enabled to edit 
    await expect.soft(page.locator(login_XPath)).toBeEnabled();
    await expect.soft(page.locator(pass_Xpath)).toBeEnabled();
    await expect.soft(page.locator("//input[@id='wp-submit']")).toBeEnabled();
    if (await page.$(login_XPath) && await page.$(pass_Xpath)) {
        //here we assign a value in username and password field 
        await page.locator(login_XPath).fill(data.username);
        await page.locator(pass_Xpath).fill(data.password);
        //here we clcik the button to login 
        await page.locator("//input[@id='wp-submit']").click();
        //here we check the after login the page appear is Dashboard or not 
        await expect.soft(page).toHaveTitle(data.DashBoardTitle);
        //here we hover the Post tab
        await page.pause();
    }
});
test('excerpt create', async ({ page }) => {

    await page.pause();
    await page.getByRole('link', { name: 'Posts', exact: true }).hover();
    //here we check Post tab visible 
    await expect.soft(page.getByRole('link', { name: 'Posts', exact: true })).toBeVisible();
    //here we click customize tab  
    await page.getByRole('link', { name: 'Posts', exact: true }).click();

    await expect.soft(page.locator('#wpbody-content').getByRole('link', { name: 'Add New' })).toBeVisible();
    await page.locator('#wpbody-content').getByRole('link', { name: 'Add New' }).click();
    await page.pause();
    if (await expect.soft(page.getByRole('button', { name: 'Close dialog' })).not.toBeVisible()) {
        await page.getByRole('button', { name: 'Close dialog' }).click();
    }

    await page.getByRole('textbox', { name: 'Add title' }).click();
    await expect.soft(page.getByRole('textbox', { name: 'Add title' })).toBeVisible();
    await expect.soft(page.getByRole('textbox', { name: 'Add title' })).toBeEditable();
    await page.getByRole('textbox', { name: 'Add title' }).fill(data.postTitle);
    await page.pause();
    await page.getByLabel('Write an excerpt (optional)').click();
    await page.getByLabel('Write an excerpt (optional)').fill(data.Excerpt);
    await page.getByRole('button', { name: 'Publish', exact: true }).click();
    await page.getByRole('region', { name: 'Editor publish' }).getByRole('button', { name: 'Publish', exact: true }).click();
})
test('excerpt UI check', async ({ page }) => {
    await page.goto(postviewURL)
    await page.pause();
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill(data.Postviewpass);
    await page.getByLabel('Password').press('Enter');
    await page.pause();
    await expect(page.locator(`//div[@class='entry-content']//p[contains(text(),'${data.Excerpt}')]`)).toContainText(data.Excerpt);
})
