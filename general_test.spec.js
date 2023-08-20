const {test, expect}=require('@playwright/test')

test('Theme check',async({page}) => {

    //variable initilizating 
    var gotoURL='https://qa-tests.d3.rgbc.dev/wp-admin/';
    var username='k@codja.net';
    var password='Z86mS9rSJ8';
    var loginTitle = 'Log In ‹ qa-tests.d3.rgbc.dev — WordPress';
    var DashBoardTitle='Dashboard ‹ qa-tests.d3.rgbc.dev — WordPress';
    var shi_Iamge_URL ="https://qa-tests.d3.rgbc.dev/wp-content/themes/storefront/screenshot.png?ver=4.2.0";
    var ThemeName="Storefront";
    var ThemeVersion="Version: 4.2.0";
    var RGB="rgbcode";
    var rgbURL="https://rgbcode.com/";
    var Theme_description="Storefront is the perfect theme for your next WooCommerce project. Designed and developed by WooCommerce Core developers, it features a bespoke integration with WooCommerce itself plus many of the most popular customer facing WooCommerce extensions. There are several layout & color options to personalise your shop, multiple widget regions, a responsive design and much more. Developers will love its lean and extensible codebase making it a joy to customize and extend. Looking for a WooCommerce theme? Look no further!";
    var theme_tags="Tags: e-commerce, two-columns, left-sidebar, right-sidebar, custom-background, custom-colors, custom-header, custom-menu, featured-images, full-width-template, threaded-comments, accessibility-ready, rtl-language-support, footer-widgets, sticky-post, theme-options, editor-style";
    const login_XPath="//input[@id='user_login']";
    const pass_Xpath="//input[@id='user_pass']";

    //opening URL
    await page.goto(gotoURL)
    //here we check the page is open is correct 
    await expect.soft(page).toHaveTitle(loginTitle)
    //here we check the login and password field is present
    await expect.soft(page.locator(login_XPath)).toBeVisible();
    await expect.soft(page.locator(pass_Xpath)).toBeVisible();
    await expect.soft(page.locator("//input[@id='wp-submit']")).toBeVisible();
    //here we check the element is enabled to edit 
    await expect.soft(page.locator(login_XPath)).toBeEnabled();
    await expect.soft(page.locator(pass_Xpath)).toBeEnabled();
    await expect.soft(page.locator("//input[@id='wp-submit']")).toBeEnabled();

    //this if block to check login with empty filed 
    if(await page.$(login_XPath) && await page.$(pass_Xpath) ){
        await page.locator(login_XPath).fill('');
        await page.locator(pass_Xpath).fill('');
        await page.locator("//input[@id='wp-submit']").click();
        await expect.soft(page.locator("//div[@id='login_error']")).toHaveAttribute('id','login_error');
    }
    //this if block to login with username and password 
    if(await page.$(login_XPath) && await page.$(pass_Xpath) ){
        //here we assign a value in username and password field 
        await page.locator(login_XPath).fill(username);
        await page.locator(pass_Xpath).fill(password);
        //here we clcik the button to login 
        await page.locator("//input[@id='wp-submit']").click();
        //here we check the after login the page appear is Dashboard or not 
        await expect.soft(page).toHaveTitle(DashBoardTitle);
        //this inner if block to check theme 
        
        if(await page.locator("//div[normalize-space()='Appearance']")){
            //here we click the Appearance button to cee theme
            await page.locator("//div[normalize-space()='Appearance']").click();
            // here we check the theme name is according to website 
            
            await expect.soft( page.getByRole('heading', { name: 'Active: Storefront' })).toContainText(ThemeName);
            // here we click that theme 
            await page.getByRole('heading', { name: 'Active: Storefront' }).click();
            //here we check the relivent image is placed on the theme  
            await expect.soft(page.locator("//div[@class='theme active']//img")).toHaveAttribute('src',shi_Iamge_URL);
            //here we check the theme version is visiable 
            await expect.soft(page.locator("//span[@class='theme-version'] ")).toBeVisible();
            //here we varifying theme version 
            await expect.soft(page.locator("//span[@class='theme-version'] ")).toHaveText(ThemeVersion);
            //here check auther name is rgbcode
            await expect.soft(page.locator("//p[@class='theme-author']/a")).toHaveText(RGB);
            //here we check RGBCODE URL is presnt as a hyperlink on auther 
            await expect.soft(page.locator("//p[@class='theme-author']/a")).toHaveAttribute('href',rgbURL);
            //here we check the theme description is present
            await expect.soft(page.locator("//p[@class='theme-description']")).toBeVisible();
            //here we check the description length should be greater than 13
            await expect.soft(page.locator("//p[@class='theme-description']")).toHaveText(Theme_description);
            //here we check tags
            await expect.soft(page.locator("//p[@class='theme-tags']")).toHaveText(theme_tags);
            
            
        }
    }

    
})
test('Site check',async({page}) => {
    var gotoURL='https://qa-tests.d3.rgbc.dev/wp-admin/';
    var username='k@codja.net';
    var password='Z86mS9rSJ8';
    var loginTitle = 'Log In ‹ qa-tests.d3.rgbc.dev — WordPress';
    var DashBoardTitle='Dashboard ‹ qa-tests.d3.rgbc.dev — WordPress';
    const login_XPath="//input[@id='user_login']";
    const pass_Xpath="//input[@id='user_pass']";

    var logoImage = "https://stage-sciencehistory.d3.rgbc.dev/wp-content/uploads/2023/02/shi-logo-300x64.png";
    var wp_default_tagline="Just another WordPress site";
    var wp_default_title="qa-tests.d3.rgbc.dev";

    //opening URL
    await page.goto(gotoURL)
    //here we check the page is open is correct 
    await expect.soft(page).toHaveTitle(loginTitle)
    //here we check the login and password field is present
    await expect.soft(page.locator(login_XPath)).toBeVisible();
    await expect.soft(page.locator(pass_Xpath)).toBeVisible();
    await expect.soft(page.locator("//input[@id='wp-submit']")).toBeVisible();
    //here we check the element is enabled to edit 
    await expect.soft(page.locator(login_XPath)).toBeEnabled();
    await expect.soft(page.locator(pass_Xpath)).toBeEnabled();
    await expect.soft(page.locator("//input[@id='wp-submit']")).toBeEnabled();

    //this if block to login with username and password 
    if(await page.$(login_XPath) && await page.$(pass_Xpath) ){
        //here we assign a value in username and password field 
        await page.locator(login_XPath).fill(username);
        await page.locator(pass_Xpath).fill(password);
        //here we clcik the button to login 
        await page.locator("//input[@id='wp-submit']").click();
        //here we check the after login the page appear is Dashboard or not 
        await expect.soft(page).toHaveTitle(DashBoardTitle);
        //here we hover the Appearance tab
        await page.getByRole('link', { name: 'Appearance' }).hover();
        // await page.pause();
        //here we check customize tab visible 
        await expect.soft(page.getByRole('link', { name: 'Customize', exact: true })).toBeVisible();
        //here we click customize tab  
        // await page.pause();
        await page.getByRole('link', { name: 'Customize', exact: true }).click();
        await page.pause();
        await page.getByRole('heading', { name: 'Site Identity Press return or enter to open this section ' }).click();
    
        // here we check logo is image is visible
        await expect.soft(page.locator('#customize-control-custom_logo img')).toBeVisible();
        // here we check logo image is present that we set 
        await expect.soft(page.locator('#customize-control-custom_logo img')).toHaveAttribute('src',logoImage);
        // here we check fav icon is visible
        await expect.soft(page.getByRole('img', { name: 'Preview as an app icon' })).toBeVisible();
        // here we check the tagline input is visible
        await expect.soft(page.getByLabel('Tagline')).toBeVisible();
        // here we check tagline input field is enabled 
        await expect.soft(page.getByLabel('Tagline')).toBeEnabled();
        //here we check tag line should be by default
        await expect.soft(page.getByLabel('Tagline')).not.toHaveText(wp_default_tagline);
        await expect.soft(page.getByLabel('Tagline')).not.toHaveText("");

        // here we check the Title input is visible
        await expect.soft(page.getByLabel('Site Title')).toBeVisible();
        // here we check Title input field is enabled 
        await expect.soft(page.getByLabel('Site Title')).toBeEnabled();
        //here we check Title should be domain name 
        await expect.soft(page.getByLabel('Site Title')).not.toHaveText(wp_default_title);
        await expect.soft(page.getByLabel('Site Title')).not.toHaveText("");
        // await page.pause();
        

    }

    
})