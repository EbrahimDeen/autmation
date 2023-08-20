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
test('auther select from post page', async ({ page }) => {
    await page.pause();
    await page.getByRole('link', { name: 'Posts', exact: true }).hover();
    //here we check Post tab visible 
    await expect.soft(page.getByRole('link', { name: 'Posts', exact: true })).toBeVisible();
    //here we click customize tab  
    await page.getByRole('link', { name: 'Posts', exact: true }).click();
    await page.pause();
    await page.locator("//td[@class='title column-title has-row-actions column-primary page-title']").first().hover();
    await page.getByRole('button', { name: `Quick edit “${data.postname}” inline` }).click();
    await page.getByRole('combobox', { name: 'Author' }).selectOption({ label: data.Fullusername });
    await page.getByRole('button', { name: 'Update' }).click();
});
test('auther select from post itslef', async ({ page }) => {
    await page.pause();
    await page.getByRole('link', { name: 'Posts', exact: true }).hover();
    //here we check Post tab visible 
    await expect.soft(page.getByRole('link', { name: 'Posts', exact: true })).toBeVisible();
    //here we click customize tab  
    await page.getByRole('link', { name: 'Posts', exact: true }).click();
    await page.pause();
    await page.locator("//td[@class='title column-title has-row-actions column-primary page-title']").first().hover();
    await page.getByRole('link', { name: `Edit “${data.postname}”` }).click();
    await page.pause();
    await page.getByRole('combobox', { name: 'Author' }).selectOption({ label: data.uname });
    if (await page.getByRole('button', { name: 'Update' }).getAttribute('aria-disabled') === 'false') {
        await page.getByRole('button', { name: 'Update' }).click();
    }


});
test('auther name check', async ({ page }) => {
    var authorTitle = data.uname + " – qa-tests.d3.rgbc.dev";
    await page.pause();
    await page.getByRole('link', { name: 'Posts', exact: true }).hover();
    //here we check Post tab visible 
    await expect.soft(page.getByRole('link', { name: 'Posts', exact: true })).toBeVisible();
    //here we click customize tab  
    await page.getByRole('link', { name: 'Posts', exact: true }).click();
    await page.pause();
    await page.locator("//td[@class='title column-title has-row-actions column-primary page-title']").first().hover();
    await page.getByRole('link', { name: `View “${data.postname}”` }).click();
    await page.pause();
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('h123456H');
    await page.getByRole('button', { name: 'Log In' }).click();
    await expect(page.locator(`//a[normalize-space()='${data.uname}']`)).toBeVisible();

    // now check if the  auther is linked with its URL
    await page.locator(`//a[normalize-space()='${data.uname}']`).click();
    await expect.soft(page).toHaveTitle(authorTitle);

});
test('Date select from post page', async ({ page }) => {
    await page.pause();
    await page.getByRole('link', { name: 'Posts', exact: true }).hover();
    //here we check Post tab visible 
    await expect.soft(page.getByRole('link', { name: 'Posts', exact: true })).toBeVisible();
    //here we click customize tab  
    await page.getByRole('link', { name: 'Posts', exact: true }).click();
    await page.pause();
    await page.locator("//td[@class='title column-title has-row-actions column-primary page-title']").first().hover();
    await page.getByRole('button', { name: `Quick edit “${data.postname}” inline` }).click();
    await page.pause();
    await page.getByRole('combobox', { name: 'Month' }).selectOption({ label: data.month_with_order });
    await page.getByRole('textbox', { name: 'Day' }).click();
    await page.getByRole('textbox', { name: 'Day' }).fill(data.Day);
    await page.getByRole('textbox', { name: 'Year' }).fill(data.Year);
    await page.getByRole('textbox', { name: 'Hour' }).fill(data.Hour);
    await page.getByRole('textbox', { name: 'Minute' }).fill(data.Minute);
    await page.getByRole('button', { name: 'Update' }).click();
});
test('Date select from post itslef', async ({ page }) => {
    const date = new Date();
    await page.pause();
    await page.getByRole('link', { name: 'Posts', exact: true }).hover();
    //here we check Post tab visible 
    await expect.soft(page.getByRole('link', { name: 'Posts', exact: true })).toBeVisible();
    //here we click customize tab  
    await page.getByRole('link', { name: 'Posts', exact: true }).click();
    await page.pause();
    await page.locator("//td[@class='title column-title has-row-actions column-primary page-title']").first().hover();
    await page.getByRole('link', { name: `Edit “${data.postname}”` }).click();
    await page.pause();
    await page.locator("//button[@class='components-button edit-post-post-schedule__toggle is-tertiary']").click();
    await page.getByLabel('Hours').fill(data.Hour);
    await page.getByLabel('Minutes').fill(data.Minute);
    await page.getByRole('button', { name: 'PM', exact: true }).click();
    await page.getByRole('combobox', { name: 'Month' }).selectOption({ label: data.Month });
    await page.getByLabel('Day').click();
    await page.getByLabel('Day').fill(data.Day);
    await page.getByLabel('Year').click();
    await page.getByLabel('Year').fill(data.Year);
    await page.getByRole('button', { name: 'Close', exact: true }).click();
    //here we check if the year is greater than the current year 
    if (date.getFullYear() < data.Year) {
        await page.getByRole('button', { name: 'Schedule' }).click();
    }
    else if (await page.getByRole('button', { name: 'Update' }).getAttribute('aria-disabled') === 'false') {
        await page.getByRole('button', { name: 'Update' }).click();
    }
    else if (await page.getByRole('button', { name: 'Publish' }).getAttribute('aria-disabled') === 'true') {
        await page.getByRole('button', { name: 'Publish', exact: true }).click();
    }

});
test.only('Date check', async ({ page }) => {

    var PostDate = data.Month + " " + data.Day + ", " + data.Year;
    await page.pause();
    await page.getByRole('link', { name: 'Posts', exact: true }).hover();
    //here we check Post tab visible 
    await expect.soft(page.getByRole('link', { name: 'Posts', exact: true })).toBeVisible();
    //here we click customize tab  
    await page.getByRole('link', { name: 'Posts', exact: true }).click();
    await page.pause();
    await page.locator("//td[@class='title column-title has-row-actions column-primary page-title']").first().hover();
    await page.getByRole('link', { name: `View “${data.postname}”` }).click();
    await page.pause();
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill(data.Postviewpass);
    await page.getByRole('button', { name: 'Log In' }).click();
    //here we check the Date is presnt 
    await expect(page.locator("//time[@class='entry-date published']")).toBeVisible();

    // now check if the  Date is same which we posted 
    await expect(page.locator("//time[@class='entry-date published']")).toHaveText(PostDate);

});
