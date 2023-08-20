const { test, expect } = require('@playwright/test')
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
test('page create', async ({ page }) => {

    //here we hover the Post tab
    await page.pause();
    await page.getByRole('link', { name: 'Pages', exact: true }).hover();
    //here we check Post tab visible 
    await expect.soft(page.locator('#menu-pages').getByRole('link', { name: 'Add New' })).toBeVisible();
    //here we click customize tab  
    await page.getByRole('link', { name: 'Pages', exact: true }).click();

    await expect.soft(page.locator('#wpbody-content').getByRole('link', { name: 'Add New' })).toBeVisible();
    await page.locator('#wpbody-content').getByRole('link', { name: 'Add New' }).click();
    await page.pause();
    if (await expect.soft(page.getByRole('button', { name: 'Close dialog' })).not.toBeVisible()) {
        await page.getByRole('button', { name: 'Close dialog' }).click();
    }

    await page.getByRole('textbox', { name: 'Add title' }).click();
    await expect.soft(page.getByRole('textbox', { name: 'Add title' })).toBeVisible();
    await expect.soft(page.getByRole('textbox', { name: 'Add title' })).toBeEditable();
    await page.getByRole('textbox', { name: 'Add title' }).fill("Hello World");

    //here we test simple paragrapgh functionality
    await expect.soft(page.getByRole('button', { name: 'Add block' })).toBeVisible();
    await page.getByRole('button', { name: 'Add block' }).click();
    await page.pause()
    await expect.soft(page.getByRole('option', { name: 'Paragraph' })).toBeVisible();
    await page.getByRole('option', { name: 'Paragraph' }).click();
    await expect.soft(page.locator('p[aria-label="Empty block; start writing or type forward slash to choose a block"]')).toBeVisible();
    await page.locator('p[aria-label="Empty block; start writing or type forward slash to choose a block"]').click();
    await page.locator('p[aria-label="Empty block; start writing or type forward slash to choose a block"]').fill(data.postname)
    await page.getByRole('textbox', { name: 'Add title' }).click();

    // here we test bold text functionality
    await page.getByRole('button', { name: 'Add block' }).click();
    await expect.soft(page.getByRole('option', { name: 'Paragraph' })).toBeVisible();
    await page.getByRole('option', { name: 'Paragraph' }).click();
    await expect.soft(page.locator('p[aria-label="Empty block; start writing or type forward slash to choose a block"]')).toBeVisible();
    await page.locator('p[aria-label="Empty block; start writing or type forward slash to choose a block"]').click();
    await page.locator("//button[contains(@aria-label, 'Bold')]").click();
    await page.locator('p[aria-label="Empty block; start writing or type forward slash to choose a block"]').click();
    await page.locator('p[aria-label="Empty block; start writing or type forward slash to choose a block"]').fill(data.postname + "bold");

    // here we test italic text functionality
    await page.getByRole('textbox', { name: 'Add title' }).click();
    await page.getByRole('button', { name: 'Add block' }).click();
    await expect.soft(page.getByRole('option', { name: 'Paragraph' })).toBeVisible();
    await page.getByRole('option', { name: 'Paragraph' }).click();
    await expect.soft(page.locator('p[aria-label="Empty block; start writing or type forward slash to choose a block"]')).toBeVisible();
    await page.locator('p[aria-label="Empty block; start writing or type forward slash to choose a block"]').click();
    await page.locator("//button[contains(@aria-label, 'Italic')]").click();
    await page.locator('p[aria-label="Empty block; start writing or type forward slash to choose a block"]').click();
    await page.locator('p[aria-label="Empty block; start writing or type forward slash to choose a block"]').fill(data.postname + "Italic");


    //Here we test heading functionality

    //heading 1 
    await page.getByRole('textbox', { name: 'Add title' }).click();
    await page.getByRole('button', { name: 'Add block' }).click();
    await expect.soft(page.getByRole('option', { name: 'Paragraph' })).toBeVisible();
    await page.getByRole('option', { name: 'Paragraph' }).click();
    await expect.soft(page.locator('p[aria-label="Empty block; start writing or type forward slash to choose a block"]')).toBeVisible();
    await page.locator('p[aria-label="Empty block; start writing or type forward slash to choose a block"]').click();
    await page.locator("//span[@class='block-editor-block-icon block-editor-block-switcher__toggle has-colors']").click();
    await page.locator("//span[normalize-space()='Heading']").click();
    await page.locator("//*[contains(@aria-label, 'Change heading level')]").click();
    await page.locator("//button[@aria-label='Heading 1']").click();
    await page.locator("//h1[contains(@aria-label, 'Block: Heading')]").fill(data.Heading + "1");
    //heading 2
    await page.getByRole('textbox', { name: 'Add title' }).click();
    await page.getByRole('button', { name: 'Add block' }).click();
    await expect.soft(page.getByRole('option', { name: 'Paragraph' })).toBeVisible();
    await page.getByRole('option', { name: 'Paragraph' }).click();
    await expect.soft(page.locator('p[aria-label="Empty block; start writing or type forward slash to choose a block"]')).toBeVisible();
    await page.locator('p[aria-label="Empty block; start writing or type forward slash to choose a block"]').click();
    await page.locator("//span[@class='block-editor-block-icon block-editor-block-switcher__toggle has-colors']").click();
    await page.locator("//span[normalize-space()='Heading']").click();
    await page.locator("//*[contains(@aria-label, 'Change heading level')]").click();
    await page.locator("//h2[contains(@aria-label, 'Block: Heading')]").fill(data.Heading + "2");
    //heading 3
    await page.getByRole('textbox', { name: 'Add title' }).click();
    await page.getByRole('button', { name: 'Add block' }).click();
    await expect.soft(page.getByRole('option', { name: 'Paragraph' })).toBeVisible();
    await page.getByRole('option', { name: 'Paragraph' }).click();
    await expect.soft(page.locator('p[aria-label="Empty block; start writing or type forward slash to choose a block"]')).toBeVisible();
    await page.locator('p[aria-label="Empty block; start writing or type forward slash to choose a block"]').click();
    await page.locator("//span[@class='block-editor-block-icon block-editor-block-switcher__toggle has-colors']").click();
    await page.locator("//span[normalize-space()='Heading']").click();
    await page.locator("//*[contains(@aria-label, 'Change heading level')]").click();
    await page.locator("//button[@aria-label='Heading 3']").click();
    await page.locator("//h3[contains(@aria-label, 'Block: Heading')]").fill(data.Heading + "3");
    //heading 4
    await page.getByRole('textbox', { name: 'Add title' }).click();
    await page.getByRole('button', { name: 'Add block' }).click();
    await expect.soft(page.getByRole('option', { name: 'Paragraph' })).toBeVisible();
    await page.getByRole('option', { name: 'Paragraph' }).click();
    await expect.soft(page.locator('p[aria-label="Empty block; start writing or type forward slash to choose a block"]')).toBeVisible();
    await page.locator('p[aria-label="Empty block; start writing or type forward slash to choose a block"]').click();
    await page.locator("//span[@class='block-editor-block-icon block-editor-block-switcher__toggle has-colors']").click();
    await page.locator("//span[normalize-space()='Heading']").click();
    await page.locator("//*[contains(@aria-label, 'Change heading level')]").click();
    await page.locator("//button[@aria-label='Heading 4']").click();
    await page.locator("//h4[contains(@aria-label, 'Block: Heading')]").fill(data.Heading + "4");
    //heading 5
    await page.getByRole('textbox', { name: 'Add title' }).click();
    await page.getByRole('button', { name: 'Add block' }).click();
    await expect.soft(page.getByRole('option', { name: 'Paragraph' })).toBeVisible();
    await page.getByRole('option', { name: 'Paragraph' }).click();
    await expect.soft(page.locator('p[aria-label="Empty block; start writing or type forward slash to choose a block"]')).toBeVisible();
    await page.locator('p[aria-label="Empty block; start writing or type forward slash to choose a block"]').click();
    await page.locator("//span[@class='block-editor-block-icon block-editor-block-switcher__toggle has-colors']").click();
    await page.locator("//span[normalize-space()='Heading']").click();
    await page.locator("//*[contains(@aria-label, 'Change heading level')]").click();
    await page.locator("//button[@aria-label='Heading 5']").click();
    await page.locator("//h5[contains(@aria-label, 'Block: Heading')]").fill(data.Heading + "5");
    //heading 6
    await page.getByRole('textbox', { name: 'Add title' }).click();
    await page.getByRole('button', { name: 'Add block' }).click();
    await expect.soft(page.getByRole('option', { name: 'Paragraph' })).toBeVisible();
    await page.getByRole('option', { name: 'Paragraph' }).click();
    await expect.soft(page.locator('p[aria-label="Empty block; start writing or type forward slash to choose a block"]')).toBeVisible();
    await page.locator('p[aria-label="Empty block; start writing or type forward slash to choose a block"]').click();
    await page.locator("//span[@class='block-editor-block-icon block-editor-block-switcher__toggle has-colors']").click();
    await page.locator("//span[normalize-space()='Heading']").click();
    await page.locator("//*[contains(@aria-label, 'Change heading level')]").click();
    await page.locator("//button[@aria-label='Heading 6']").click();
    await page.locator("//h6[contains(@aria-label, 'Block: Heading')]").fill(data.Heading + "6");

    //Here we test Quote functionality
    await page.getByRole('textbox', { name: 'Add title' }).click();
    await page.getByRole('button', { name: 'Add block' }).click();

    await expect.soft(page.locator("//input[contains(@class, 'components-search-control__input')]")).toBeVisible();
    await expect.soft(page.locator("//input[contains(@class, 'components-search-control__input')]")).toBeEditable();
    await page.locator("//input[contains(@class, 'components-search-control__input')]").fill("Quote");
    await page.locator("//input[contains(@class, 'components-search-control__input')]").click();

    await expect.soft(page.getByRole('listbox', { name: 'Blocks' }).getByRole('option', { name: 'Quote', exact: true })).toBeVisible();
    await page.getByRole('listbox', { name: 'Blocks' }).getByRole('option', { name: 'Quote', exact: true }).click();

    await expect.soft(page.getByRole('document', { name: 'Empty block; start writing or type forward slash to choose a block' })).toBeVisible();
    await page.getByRole('document', { name: 'Empty block; start writing or type forward slash to choose a block' }).click();
    await page.getByRole('document', { name: 'Empty block; start writing or type forward slash to choose a block' }).fill("The future belongs to those who believe in the beauty of their dreams.");

    await expect.soft(page.getByRole('textbox', { name: 'Quote citation' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Quote citation' }).click();
    await page.getByRole('textbox', { name: 'Quote citation' }).fill("Eleanor Roosevelt");

    // here we test link text functionality
    await page.getByRole('textbox', { name: 'Add title' }).click();
    await page.getByRole('button', { name: 'Add block' }).click();
    await expect.soft(page.getByRole('option', { name: 'Paragraph' })).toBeVisible();
    await page.getByRole('option', { name: 'Paragraph' }).click();
    await expect.soft(page.locator('p[aria-label="Empty block; start writing or type forward slash to choose a block"]')).toBeVisible();
    await page.locator('p[aria-label="Empty block; start writing or type forward slash to choose a block"]').click();
    await page.getByRole('button', { name: 'Link' }).click();
    await page.getByPlaceholder('Search or type url').click();
    await page.getByPlaceholder('Search or type url').fill('www.google.com');
    await page.getByRole('button', { name: 'Submit' }).click();

    //Here we test List functionality
    await page.getByRole('textbox', { name: 'Add title' }).click();
    await page.getByRole('button', { name: 'Add block' }).click();
    await page.getByPlaceholder('Search', { exact: true }).click();
    await page.getByPlaceholder('Search', { exact: true }).fill('list');
    await page.getByRole('option', { name: 'List', exact: true }).click();
    await page.getByRole('textbox', { name: 'List text' }).fill('Test');
    await page.getByRole('textbox', { name: 'List text' }).click();
    await page.getByRole('textbox', { name: 'List text' }).press('Enter');
    await page.getByRole('button', { name: 'Add List' }).click();
    await page.getByRole('textbox', { name: 'List text' }).nth(1).click();
    await page.getByRole('textbox', { name: 'List text' }).nth(1).fill('test sub');
    await page.getByText('Test', { exact: true }).click();
    await page.pause();
    //Here we test Media functionality
    await page.getByRole('textbox', { name: 'Add title' }).click();
    await page.getByRole('button', { name: 'Add block' }).click();
    await page.getByPlaceholder('Search', { exact: true }).click();
    await page.getByPlaceholder('Search', { exact: true }).fill('Image');
    await page.getByRole('option', { name: 'Image', exact: true }).click();
    await page.pause();
    await page.getByRole('button', { name: 'Media Library' }).click();
    await page.getByRole('checkbox', { name: 'wallpapersden.com_anime-naruto-artwork_1920x1080', exact: true }).click();
    await page.getByRole('button', { name: 'Select', exact: true }).click();
    await page.getByRole('textbox', { name: 'Image caption text' }).click();
    await page.getByRole('textbox', { name: 'Image caption text' }).fill('Test caption');
    //for video
    await page.getByRole('textbox', { name: 'Add title' }).click();
    await page.getByRole('button', { name: 'Add block' }).click();
    await page.getByPlaceholder('Search', { exact: true }).click();
    await page.getByPlaceholder('Search', { exact: true }).fill('video');
    await page.getByRole('option', { name: 'Video', exact: true }).click();
    await page.getByRole('button', { name: 'Insert from URL' }).click();
    await page.getByPlaceholder('Paste or type URL').click();
    await page.getByPlaceholder('Paste or type URL').fill('https://stage-sciencehistory.d3.rgbc.dev/wp-content/uploads/2023/02/video.mp4?_=1');
    await page.getByRole('button', { name: 'Apply' }).click();
    await page.pause();
    await page.getByLabel('Autoplay').check();
    await page.getByLabel('Loop').check();
    await page.getByRole('textbox', { name: 'Video caption text' }).click();
    await page.getByRole('textbox', { name: 'Video caption text' }).fill('Test caption');

    // Here we test Table functionality
    await page.getByRole('button', { name: 'Toggle block inserter' }).click();
    await page.getByPlaceholder('Search', { exact: true }).click();
    await page.getByPlaceholder('Search', { exact: true }).fill('table');
    await page.getByRole('option', { name: 'Table', exact: true }).click();
    await page.getByLabel('Column count').click();
    await page.getByLabel('Column count').fill('2');
    await page.getByLabel('Row count').click();
    await page.getByLabel('Row count').fill('2');
    await page.getByRole('button', { name: 'Create Table' }).click();
    await page.getByRole('button', { name: 'Settings', exact: true }).click();
    await page.getByLabel('Fixed width table cells').check();
    await page.getByLabel('Header section').check();
    await page.getByRole('textbox', { name: 'Header cell text' }).first().click();
    await page.getByRole('textbox', { name: 'Header cell text' }).first().fill('Heading 1');
    await page.getByRole('textbox', { name: 'Header cell text' }).nth(1).click();
    await page.getByRole('textbox', { name: 'Header cell text' }).nth(1).fill('heading 2');
    await page.getByRole('textbox', { name: 'Body cell text' }).first().fill('cell');
    await page.getByRole('textbox', { name: 'Body cell text' }).first().click();
    await page.getByText('cell', { exact: true }).fill('cell 1');
    await page.getByRole('textbox', { name: 'Body cell text' }).nth(1).click();
    await page.getByRole('textbox', { name: 'Body cell text' }).nth(1).fill('cell 2');
    await page.getByRole('textbox', { name: 'Body cell text' }).nth(2).click();
    await page.getByRole('textbox', { name: 'Body cell text' }).nth(2).fill('cell 3');
    await page.getByRole('textbox', { name: 'Body cell text' }).nth(3).click();
    await page.getByRole('textbox', { name: 'Body cell text' }).nth(3).fill('cell 4');
    await page.getByRole('textbox', { name: 'Table caption text' }).click();
    await page.getByRole('textbox', { name: 'Table caption text' }).fill('table test');

    //Here we test Separator functionality
    await page.getByRole('button', { name: 'Toggle block inserter' }).click();
    await page.getByPlaceholder('Search', { exact: true }).click();
    await page.getByPlaceholder('Search', { exact: true }).fill('separator');
    await page.getByRole('option', { name: 'Separator', exact: true }).click();
    await page.getByRole('document', { name: 'Block: Separator' }).click();
    await page.getByRole('button', { name: 'Settings', exact: true }).click();
    await page.getByRole('button', { name: 'Dots' }).click();
    await page.getByRole('button', { name: 'Thick' }).click();
    await page.getByRole('button', { name: 'Default' }).click();
    await page.getByRole('button', { name: 'Background' }).click();
    await page.getByRole('button', { name: 'Color: Purple' }).click();

    //Here we test Align text functionality
    await page.getByRole('button', { name: 'Toggle block inserter' }).click();
    await page.getByPlaceholder('Search', { exact: true }).click();
    await page.getByPlaceholder('Search', { exact: true }).fill('paragraph');
    await page.getByRole('option', { name: 'Paragraph', exact: true }).click();
    await page.getByRole('document', { name: 'Empty block; start writing or type forward slash to choose a block' }).click();
    await page.getByRole('document', { name: 'Empty block; start writing or type forward slash to choose a block' }).fill('alignmnet');
    await page.getByRole('button', { name: 'Align' }).click();
    await page.getByRole('menuitemradio', { name: 'Align text center' }).click();
    await page.getByRole('button', { name: 'Align' }).click();
    await page.getByRole('menuitemradio', { name: 'Align text right' }).click();
    await page.getByRole('button', { name: 'Align' }).click();
    await page.getByRole('menuitemradio', { name: 'Align text left' }).click();

    //Here we test spacer functionality
    await page.getByRole('button', { name: 'Toggle block inserter' }).click();
    await page.getByPlaceholder('Search', { exact: true }).click();
    await page.getByPlaceholder('Search', { exact: true }).fill('spacer');
    await page.getByRole('option', { name: 'Spacer', exact: true }).click();
    await page.getByRole('document', { name: 'Block: Spacer' }).click();
    await page.getByRole('button', { name: 'Settings', exact: true }).click();
    await page.getByLabel('Height').click();
    await page.getByLabel('Height').fill('50');

    // here we publish the post and view
    await page.getByRole('button', { name: 'Publish', exact: true }).click();
    await page.getByRole('region', { name: 'Editor publish' }).getByRole('button', { name: 'Publish', exact: true }).click();
    await page.pause();
    await page.getByRole('region', { name: 'Editor publish' }).getByRole('link', { name: 'View Page' }).click();
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill(data.Postviewpass);
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.pause();




})

test.only('page Edit', async ({ page }) => {

    //variable initilizating
    const login_XPath = "//input[@id='user_login']";
    const pass_Xpath = "//input[@id='user_pass']";
    //here we hover the Post tab
    await page.pause();
    await page.getByRole('link', { name: 'Pages', exact: true }).hover();
    //here we check Post tab visible 
    await expect.soft(page.getByRole('link', { name: 'Pages', exact: true })).toBeVisible();
    //here we click customize tab  
    await page.getByRole('link', { name: 'Pages', exact: true }).click();
    await page.pause();

    await page.locator(`//a[contains(text(),'${data.postname}')]`).first().hover();
    await page.getByRole('link', { name: `Edit “${data.postname}”` }).click();
    await page.getByRole('textbox', { name: 'Add title' }).click();
    await page.getByRole('textbox', { name: 'Add title' }).fill('Hello World edit');
    await page.getByRole('button', { name: 'Update' }).click();


})
test('Post Delete', async ({ page }) => {

    //here we hover the Page tab
    await page.pause();
    await page.getByRole('link', { name: 'Pages', exact: true }).hover();
    //here we check Post tab visible 
    await expect.soft(page.getByRole('link', { name: 'Pages', exact: true })).toBeVisible();
    //here we click customize tab  
    await page.getByRole('link', { name: 'Pages', exact: true }).click();
    await page.locator(`//a[contains(text(),'${data.postname}')]`).first().hover();
    await page.getByRole('link', { name: 'Move “Hello World edit” to the Trash' }).click();
    await page.pause();


})
test('published status from Quick setting ', async ({ page }) => {

    //here we hover the Page tab
    await page.pause();
    await page.getByRole('link', { name: 'Pages', exact: true }).hover();
    //here we check Post tab visible 
    await expect.soft(page.getByRole('link', { name: 'Pages', exact: true })).toBeVisible();
    //here we click customize tab  
    await page.getByRole('link', { name: 'Pages', exact: true }).click();
    await page.locator(`//a[contains(text(),'${data.postname}')]`).first().hover();
    await page.getByRole('button', { name: `Quick edit “${data.postname}” inline` }).click();
    await page.pause();
    await page.getByRole('combobox', { name: 'Status' }).selectOption(data.pageStatus);
    await page.getByRole('button', { name: 'Update' }).click();

})
test('private status from Quick setting ', async ({ page }) => {

    //here we hover the Page tab
    await page.pause();
    await page.getByRole('link', { name: 'Pages', exact: true }).hover();
    //here we check Post tab visible 
    await expect.soft(page.getByRole('link', { name: 'Pages', exact: true })).toBeVisible();
    //here we click customize tab  
    await page.getByRole('link', { name: 'Pages', exact: true }).click();
    await page.locator(`//a[contains(text(),'${data.postname}')]`).first().hover();
    await page.getByRole('button', { name: `Quick edit “${data.postname}” inline` }).click();
    await page.pause();
    await page.getByRole('checkbox', { name: 'Private' }).check();//if you want to uncheck just use await page.getByRole('checkbox', { name: 'Private' }).uncheck();
    await page.getByRole('button', { name: 'Update' }).click();

})
test('set password from Quick setting ', async ({ page }) => {

    //here we hover the Page tab
    await page.pause();
    await page.getByRole('link', { name: 'Pages', exact: true }).hover();
    //here we check Post tab visible 
    await expect.soft(page.getByRole('link', { name: 'Pages', exact: true })).toBeVisible();
    //here we click customize tab  
    await page.getByRole('link', { name: 'Pages', exact: true }).click();
    await page.locator(`//a[contains(text(),'${data.postname}')]`).first().hover();
    await page.getByRole('button', { name: `Quick edit “${data.postname}” inline` }).click();
    await page.pause();
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(data.setpass);
    await page.getByRole('button', { name: 'Update' }).click();
})
//to run this test commnet the before each blog 
test('Visibility', async ({ page }) => {

    await page.pause();
    await page.goto(data.postviewURL + data.postname);
    await page.pause();
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill(data.Postviewpass);
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.pause();
    await expect.soft(page).toHaveTitle(data.PageNotfoundTitle)
})
test('private status from page it self', async ({ page }) => {

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
    await page.getByRole('button', { name: 'Select visibility: Private' }).click();
    await page.getByLabel('Public').check();
    await page.pause();
    await page.getByText('Private').click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.getByLabel('Public').check();
    await page.getByText('Private').click();
    await page.getByRole('button', { name: 'OK' }).click();
})
test('set password from page it self', async ({ page }) => {

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
    await page.getByRole('button', { name: 'Select visibility: Private' }).click();
    await page.getByText('Password protected', { exact: true }).click();
    await page.getByPlaceholder('Use a secure password').click();
    await page.getByPlaceholder('Use a secure password').fill(data.setpass);
    await page.getByRole('button', { name: 'Update' }).click();

})
test('Order option from Quick setting ', async ({ page }) => {

    //here we hover the Page tab
    await page.pause();
    await page.getByRole('link', { name: 'Pages', exact: true }).hover();
    //here we check Post tab visible 
    await expect.soft(page.getByRole('link', { name: 'Pages', exact: true })).toBeVisible();
    //here we click customize tab  
    await page.getByRole('link', { name: 'Pages', exact: true }).click();
    await page.locator(`//a[contains(text(),'${data.postname}')]`).first().hover();
    await page.getByRole('button', { name: `Quick edit “${data.postname}” inline` }).click();
    await page.pause();
    await page.getByRole('textbox', { name: 'Order' }).click();
    await page.getByRole('textbox', { name: 'Order' }).fill(data.pageOrder);
    await page.getByRole('button', { name: 'Update' }).click();
})
test('Parent page from Quick setting ', async ({ page }) => {

    //here we hover the Page tab
    await page.pause();
    await page.getByRole('link', { name: 'Pages', exact: true }).hover();
    //here we check Post tab visible 
    await expect.soft(page.getByRole('link', { name: 'Pages', exact: true })).toBeVisible();
    //here we click customize tab  
    await page.getByRole('link', { name: 'Pages', exact: true }).click();
    await page.locator(`//a[contains(text(),'${data.postname}')]`).first().hover();
    await page.getByRole('button', { name: `Quick edit “${data.postname}” inline` }).click();
    await page.pause();
    await page.getByRole('combobox', { name: 'Parent' }).selectOption({ label: data.parentPage });
    await page.getByRole('button', { name: 'Update' }).click();

})
test('Parent page from page it self', async ({ page }) => {

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
    await page.locator('.components-combobox-control__suggestions-container > .components-flex').click();
    await page.getByRole('option', { name: data.parentPage }).click();
    await page.getByRole('button', { name: 'Update' }).click();


})
test('Order option from page it self', async ({ page }) => {

    //here we hover the Page tab
    await page.pause();
    await page.getByRole('link', { name: 'Pages', exact: true }).hover();
    //here we check Post tab visible 
    await expect.soft(page.getByRole('link', { name: 'Pages', exact: true })).toBeVisible();
    //here we click customize tab  
    await page.getByRole('link', { name: 'Pages', exact: true }).click();
    
    //await page.locator(`//a[contains(text(),'${data.postname}')]`).first().hover();
    await page.locator(`//a[contains(text(),'${data.postname}')]`).first().hover();
    await page.getByRole('link', { name: `Edit “${data.postname}”` }).click();
    await page.pause();
    await page.getByRole('button', { name: 'Page Attributes' }).click();
    await page.getByRole('button', { name: 'Page Attributes' }).click();
    await page.getByLabel('Order').click();
    await page.getByLabel('Order').fill(data.pageOrder);
    await page.getByRole('button', { name: 'Update' }).click()



})