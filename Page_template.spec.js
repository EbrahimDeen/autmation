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
test('page Template change from quick setting', async ({ page }) => {

    //here we hover the Post tab
    await page.pause();
    await page.getByRole('link', { name: 'Pages', exact: true }).hover();
    //here we check Post tab visible 
    await expect.soft(page.getByRole('link', { name: 'Pages', exact: true })).toBeVisible();
    //here we click customize tab  
    await page.getByRole('link', { name: 'Pages', exact: true }).click();
    await page.locator(`//a[contains(text(),'${data.postname}')]`).first().hover();
    await page.getByRole('button', { name: `Quick edit “${data.postname}” inline` }).click();
    await page.pause();
    await page.getByRole('combobox', { name: 'Template' }).selectOption(data.TemplateFIlename);
    await page.getByRole('button', { name: 'Update' }).click();


})
test.only('page Template change from page it self', async ({ page }) => {

    //here we hover the Page tab
    await page.pause();
    await page.getByRole('link', { name: 'Pages', exact: true }).hover();
    //here we check Post tab visible 
    await expect.soft(page.getByRole('link', { name: 'Pages', exact: true })).toBeVisible();
    //here we click customize tab  
    await page.getByRole('link', { name: 'Pages', exact: true }).click();
    await page.locator(`//a[contains(text(),'${data.postname}')]`).first().hover();
    await page.getByRole('link', { name: `Edit “${data.postname}”` }).click();
    await page.pause();
    await page.getByRole('button', { name: `Select template: ${data.TemplateToChnage}` }).click();
    await page.getByRole('combobox', { name: 'Template' }).selectOption(data.TemplateFIlename);
    await page.getByRole('button', { name: 'Update' }).click();

})