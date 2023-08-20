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
test('Feature image', async ({ page }) => {
    await page.pause();
    await page.getByRole('link', { name: 'Pages', exact: true }).hover();
    //here we check Post tab visible 
    await expect.soft(page.getByRole('link', { name: 'Pages', exact: true })).toBeVisible();
    //here we click customize tab  
    await page.getByRole('link', { name: 'Pages', exact: true }).click();
    await page.locator(`//a[contains(text(),'${data.postname}')]`).first().hover();
    await page.getByRole('link', { name: `Edit “${data.postname}”` }).click();
    await page.pause();
    await page.getByRole('button', { name: 'Set featured image' }).click();
    await page.pause()
    await page.getByRole('tab', { name: 'Media Library' }).click();
    await page.getByRole('checkbox', { name: data.Image_title }).click();
    await page.getByRole('button', { name: 'Set featured image' }).click();
    await page.pause()
    await page.getByRole('button', { name: 'Update', exact: true }).click();


})
test('excerpt UI check', async ({ page }) => {
    await page.pause();
    await page.getByRole('link', { name: 'Pages', exact: true }).hover();
    //here we check Post tab visible 
    await expect.soft(page.getByRole('link', { name: 'Pages', exact: true })).toBeVisible();
    //here we click customize tab  
    await page.getByRole('link', { name: 'Pages', exact: true }).click();
    await page.locator(`//a[contains(text(),'${data.postname}')]`).first().hover();
    await page.getByRole('link', { name: `View “${data.postname}”` }).click();
    await page.pause();
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill(data.Postviewpass);
    await page.getByLabel('Password').press('Enter');
    await page.pause();
    await expect(page.locator("//img[@class='attachment-post-thumbnail size-post-thumbnail wp-post-image']")).toHaveAttribute("src", data.contnet_URL + data.Image_title);
})
test('Enable comments from page', async ({ page }) => {
    await page.pause();
    await page.getByRole('link', { name: 'Pages', exact: true }).hover();
    //here we check Post tab visible 
    await expect.soft(page.getByRole('link', { name: 'Pages', exact: true })).toBeVisible();
    //here we click customize tab  
    await page.getByRole('link', { name: 'Pages', exact: true }).click();
    await page.locator(`//a[contains(text(),'${data.postname}')]`).first().hover();
    await page.getByRole('link', { name: `Edit “${data.postname}”` }).click();
    await page.pause();
    await page.getByLabel('Allow comments').check();
    await page.pause();
    await page.getByRole('button', { name: 'Update', exact: true }).click();
})
test.only('Enable comments from Quick settings', async ({ page }) => {
    await page.pause();
    await page.getByRole('link', { name: 'Pages', exact: true }).hover();
    //here we check Post tab visible 
    await expect.soft(page.getByRole('link', { name: 'Pages', exact: true })).toBeVisible();
    //here we click customize tab  
    await page.getByRole('link', { name: 'Pages', exact: true }).click();
    await page.locator(`//a[contains(text(),'${data.postname}')]`).first().hover();
    await page.getByRole('button', { name: `Quick edit “${data.postname}” inline` }).click();
    await page.pause();
    await page.getByRole('checkbox', { name: 'Allow Comments' }).uncheck();
    await page.getByRole('checkbox', { name: 'Allow Comments' }).check();
    await page.pause();
    await page.getByRole('button', { name: 'Update', exact: true }).click();
})
test('Comment UI check', async ({ page }) => {
    await page.pause();
    await page.getByRole('link', { name: 'Pages', exact: true }).hover();
    //here we check Post tab visible 
    await expect.soft(page.getByRole('link', { name: 'Pages', exact: true })).toBeVisible();
    //here we click customize tab  
    await page.getByRole('link', { name: 'Pages', exact: true }).click();
    await page.locator(`//a[contains(text(),'${data.postname}')]`).first().hover();
    await page.getByRole('link', { name: `View “${data.postname}”` }).click();
    await page.pause();
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill(data.Postviewpass);
    await page.getByLabel('Password').press('Enter');
    await page.pause();
    await expect(page.locator("//div[@class='wp-block-comments']")).toBeVisible();
})
