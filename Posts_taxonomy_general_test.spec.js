const {test, expect}=require('@playwright/test')

test.only('create category and sub category',async({page}) => {

    //variable initilizating 
    var gotoURL='https://qa-tests.d3.rgbc.dev/wp-admin/';
    var username='k@codja.net';
    var password='Z86mS9rSJ8';
    var loginTitle = 'Log In ‹ qa-tests.d3.rgbc.dev — WordPress';
    var DashBoardTitle='Dashboard ‹ qa-tests.d3.rgbc.dev — WordPress';
    const login_XPath="//input[@id='user_login']";
    const pass_Xpath="//input[@id='user_pass']";
    var parentCategory="parent";
    var childCategory="child";
    const testarry = ["BMW", "Volvo", "Saab", "Ford", "Fiat", "Audi"];
    var categoryDiscription="bla bla bla bla";

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
        //here we hover the Post tab
        await page.pause();
        await page.getByRole('link', { name: 'Posts', exact: true }).hover();
        
        await page.locator('#menu-posts').getByRole('link', { name: 'Categories' }).click();
        // here we add parent category with  
        await page.getByRole('textbox', { name: 'Name' }).click();
        await page.getByRole('textbox', { name: 'Name' }).fill(parentCategory);
        await page.getByRole('textbox', { name: 'Slug' }).click();
        await page.getByRole('textbox', { name: 'Slug' }).fill(parentCategory);
        await page.locator("//select[@id='parent']").selectOption({ label: 'None' });
        await page.getByRole('textbox', { name: 'Description' }).click();
        await page.getByRole('textbox', { name: 'Description' }).fill(categoryDiscription);
        await page.getByRole('button', { name: 'Add New Category' }).click();

        // here we add child category with single entity 
        await page.getByRole('textbox', { name: 'Name' }).click();
        await page.getByRole('textbox', { name: 'Name' }).fill(childCategory);
        await page.getByRole('textbox', { name: 'Slug' }).click();
        await page.getByRole('textbox', { name: 'Slug' }).fill(childCategory);
        await page.locator("//select[@id='parent']").selectOption({ label: parentCategory });
        await page.getByRole('textbox', { name: 'Description' }).click();
        await page.getByRole('textbox', { name: 'Description' }).fill(categoryDiscription);
        await page.getByRole('button', { name: 'Add New Category' }).click();

        await page.pause();
        // here we check dynamically through loop by inserting childs 
        for (let i = 0; i < testarry.length; i++) {
            await page.getByRole('textbox', { name: 'Name' }).click();
            await page.getByRole('textbox', { name: 'Name' }).fill(testarry[i]);
            await page.getByRole('textbox', { name: 'Slug' }).click();
            await page.getByRole('textbox', { name: 'Slug' }).fill(testarry[i]);
            await page.locator("//select[@id='parent']").selectOption({ label: parentCategory });
            await page.getByRole('textbox', { name: 'Description' }).click();
            await page.getByRole('textbox', { name: 'Description' }).fill(categoryDiscription);
            await page.getByRole('button', { name: 'Add New Category' }).click();
        }
        await page.pause();
    }

    
})

test('edit create category and sub category',async({page}) => {

    //variable initilizating 
    var gotoURL='https://qa-tests.d3.rgbc.dev/wp-admin/';
    var username='k@codja.net';
    var password='Z86mS9rSJ8';
    var loginTitle = 'Log In ‹ qa-tests.d3.rgbc.dev — WordPress';
    var DashBoardTitle='Dashboard ‹ qa-tests.d3.rgbc.dev — WordPress';
    const login_XPath="//input[@id='user_login']";
    const pass_Xpath="//input[@id='user_pass']";
    var parentCategory="parent";
    var childCategory="child";
    const testarry = ["BMW", "Volvo", "Saab", "Ford", "Fiat", "Audi"];
    var categoryDiscription="bla bla bla bla";

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
        //here we hover the Post tab
        await page.pause();
        await page.getByRole('link', { name: 'Posts', exact: true }).hover();
        
        await page.locator('#menu-posts').getByRole('link', { name: 'Categories' }).click();
        await page.locator("//td[@class='name column-name has-row-actions column-primary']").first().hover();
        await page.getByRole('link', { name: 'Edit “parent”' }).click();
        await page.getByLabel('Name').click();
        await page.getByLabel('Name').fill('parent edit');
        await page.getByRole('button', { name: 'Update' }).click();
        await page.pause();
    }

    
})

test('Delete category and sub category',async({page}) => {

    //variable initilizating 
    var gotoURL='https://qa-tests.d3.rgbc.dev/wp-admin/';
    var username='k@codja.net';
    var password='Z86mS9rSJ8';
    var loginTitle = 'Log In ‹ qa-tests.d3.rgbc.dev — WordPress';
    var DashBoardTitle='Dashboard ‹ qa-tests.d3.rgbc.dev — WordPress';
    const login_XPath="//input[@id='user_login']";
    const pass_Xpath="//input[@id='user_pass']";
    var parentCategory="parent";
    var childCategory="child";
    const testarry = ["BMW", "Volvo", "Saab", "Ford", "Fiat", "Audi"];
    var categoryDiscription="bla bla bla bla";

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
        //here we hover the Post tab
        await page.pause();
        await page.getByRole('link', { name: 'Posts', exact: true }).hover();
        
        await page.locator('#menu-posts').getByRole('link', { name: 'Categories' }).click();
        await page.locator("//td[@class='name column-name has-row-actions column-primary']").first().hover();
        await page.getByRole('button', { name: 'Delete “parent edit”' }).click();
        page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept().catch(() => {});
        });
        await page.getByRole('button', { name: 'Delete “parent edit”' }).click();
        await page.pause();
    }

    
})

test('Create Tag from the dashboard menu',async({page}) => {

    //variable initilizating 
    var gotoURL='https://qa-tests.d3.rgbc.dev/wp-admin/';
    var username='k@codja.net';
    var password='Z86mS9rSJ8';
    var loginTitle = 'Log In ‹ qa-tests.d3.rgbc.dev — WordPress';
    var DashBoardTitle='Dashboard ‹ qa-tests.d3.rgbc.dev — WordPress';
    const login_XPath="//input[@id='user_login']";
    const pass_Xpath="//input[@id='user_pass']";
    var tag="parent";
    const testarry = ["BMW", "Volvo", "Saab", "Ford", "Fiat", "Audi"];
    var tagDiscription="bla bla bla bla";

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
        //here we hover the Post tab
        await page.pause();
        await page.getByRole('link', { name: 'Posts', exact: true }).hover();
        
        await page.locator('#menu-posts').getByRole('link', { name: 'Tags' }).click();
       
        await page.getByRole('textbox', { name: 'Name' }).click();
        await page.getByRole('textbox', { name: 'Name' }).fill(tag);
        await page.getByRole('textbox', { name: 'Slug' }).click();
        await page.getByRole('textbox', { name: 'Slug' }).fill(tag);
        await page.getByRole('textbox', { name: 'Description' }).click();
        await page.getByRole('textbox', { name: 'Description' }).fill(tagDiscription);
        await page.getByRole('button', { name: 'Add New Tag' }).click();

        for (let i = 0; i < testarry.length; i++) {
            await page.getByRole('textbox', { name: 'Name' }).click();
            await page.getByRole('textbox', { name: 'Name' }).fill(testarry[i]);
            await page.getByRole('textbox', { name: 'Slug' }).click();
            await page.getByRole('textbox', { name: 'Slug' }).fill(testarry[i]);
            await page.getByRole('textbox', { name: 'Description' }).click();
            await page.getByRole('textbox', { name: 'Description' }).fill(tagDiscription);
            await page.getByRole('button', { name: 'Add New Tag' }).click();
            await page.pause();
        }

        await page.pause();
    }

    
})

test('Edit Tag from the dashboard menu',async({page}) => {

    //variable initilizating 
    var gotoURL='https://qa-tests.d3.rgbc.dev/wp-admin/';
    var username='k@codja.net';
    var password='Z86mS9rSJ8';
    var loginTitle = 'Log In ‹ qa-tests.d3.rgbc.dev — WordPress';
    var DashBoardTitle='Dashboard ‹ qa-tests.d3.rgbc.dev — WordPress';
    const login_XPath="//input[@id='user_login']";
    const pass_Xpath="//input[@id='user_pass']";
    var tag="parent";
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
        //here we hover the Post tab
        await page.pause();
        await page.getByRole('link', { name: 'Posts', exact: true }).hover();
        
        await page.locator('#menu-posts').getByRole('link', { name: 'Tags' }).click();
        await page.locator("//td[@class='name column-name has-row-actions column-primary']").first().hover();
        await page.getByRole('link', { name: `Edit “${tag}”` }).click();
        await page.getByLabel('Name').click();
        await page.getByLabel('Name').fill('Audi eidt');
        await page.getByRole('button', { name: 'Update' }).click();
        await page.pause();

        
    }

    
})

test('Delete Tag from the dashboard menu',async({page}) => {

    //variable initilizating 
    var gotoURL='https://qa-tests.d3.rgbc.dev/wp-admin/';
    var username='k@codja.net';
    var password='Z86mS9rSJ8';
    var loginTitle = 'Log In ‹ qa-tests.d3.rgbc.dev — WordPress';
    var DashBoardTitle='Dashboard ‹ qa-tests.d3.rgbc.dev — WordPress';
    const login_XPath="//input[@id='user_login']";
    const pass_Xpath="//input[@id='user_pass']";
    var tag="parent";
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
        //here we hover the Post tab
        await page.pause();
        await page.getByRole('link', { name: 'Posts', exact: true }).hover();
        
        await page.locator('#menu-posts').getByRole('link', { name: 'Tags' }).click();
        await page.locator("//td[@class='name column-name has-row-actions column-primary']").first().hover();
        page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept().catch(() => {});
          });
          await page.getByRole('button', { name: 'Delete “parent”' }).click();
        await page.pause();

        
    }

    
})

test('Create the post Category and child Category from the Post itself',async({page}) => {

    //variable initilizating 
    var gotoURL='https://qa-tests.d3.rgbc.dev/wp-admin/';
    var username='k@codja.net';
    var password='Z86mS9rSJ8';
    var loginTitle = 'Log In ‹ qa-tests.d3.rgbc.dev — WordPress';
    var DashBoardTitle='Dashboard ‹ qa-tests.d3.rgbc.dev — WordPress';
    const login_XPath="//input[@id='user_login']";
    const pass_Xpath="//input[@id='user_pass']";
    var Category="parent";
    var childCategory="hello child";
    const childCategory_arry = ["hello child1", "hello child2", "hello child3", "hello child4", "hello child5", "hello child6"];
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
        //here we hover the Post tab
        await page.pause();
        await page.getByRole('link', { name: 'Posts', exact: true }).hover();
        //here we check Post tab visible 
        await expect.soft(page.getByRole('link', { name: 'Posts', exact: true })).toBeVisible();
        //here we click customize tab  
        await page.getByRole('link', { name: 'Posts', exact: true }).click();

        await expect.soft( page.locator('#wpbody-content').getByRole('link', { name: 'Add New' })).toBeVisible();
        await page.locator('#wpbody-content').getByRole('link', { name: 'Add New' }).click();
        await page.pause();
        // await page.getByRole('button', { name: 'Categories' }).click();
        //here we add a parent category
        await page.getByRole('button', { name: 'Add New Category' }).click();
        await page.getByLabel('New Category Name').click();
        await page.getByLabel('New Category Name').fill(Category);
        await page.locator("//select[@id='inspector-select-control-1']").selectOption({ label: "— Parent Category —" });
        await page.locator("//button[@type='submit']").click();
        await page.pause();
        // here we add child category
        await page.getByLabel('New Category Name').click();
        await page.getByLabel('New Category Name').fill(childCategory);
        await page.locator("//select[@id='inspector-select-control-1']").selectOption({ label: Category });
        await page.locator("//button[@type='submit']").click();
        await page.pause();

        //here we add sub category through loop
        for (let i = 0; i < childCategory_arry.length; i++) {
            await page.getByLabel('New Category Name').click();
            await page.getByLabel('New Category Name').fill(childCategory_arry[i]);
            await page.locator("//select[@id='inspector-select-control-1']").selectOption({ label: Category });
            await page.locator("//button[@type='submit']").click();
            await page.pause();
        }
        
    }

    
})

test('Create the post tags from the Post page',async({page}) => {

    //variable initilizating 
    var gotoURL='https://qa-tests.d3.rgbc.dev/wp-admin/';
    var username='k@codja.net';
    var password='Z86mS9rSJ8';
    var loginTitle = 'Log In ‹ qa-tests.d3.rgbc.dev — WordPress';
    var DashBoardTitle='Dashboard ‹ qa-tests.d3.rgbc.dev — WordPress';
    const login_XPath="//input[@id='user_login']";
    const pass_Xpath="//input[@id='user_pass']";
    var tag="parent";
    const tagarray = ["BMW", "Volvo", "Saab", "Ford", "Fiat", "Audi"];
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
        //here we hover the Post tab
        await page.pause();
        await page.getByRole('link', { name: 'Posts', exact: true }).hover();
        //here we check Post tab visible 
        await expect.soft(page.getByRole('link', { name: 'Posts', exact: true })).toBeVisible();
        //here we click customize tab  
        await page.getByRole('link', { name: 'Posts', exact: true }).click();

        await expect.soft( page.locator('#wpbody-content').getByRole('link', { name: 'Add New' })).toBeVisible();
        await page.locator('#wpbody-content').getByRole('link', { name: 'Add New' }).click();
        await page.pause();
        // await page.getByRole('button', { name: 'Tags' }).click();
        await page.getByLabel('Add New Tag').click();
        await page.getByLabel('Add New Tag').fill(tag);
        await page.getByLabel('Add New Tag').press('Enter');
        
       
        //here we add tag through loop
        for (let i = 0; i < tagarray.length; i++) {
            await page.getByLabel('Add New Tag').click();
            await page.getByLabel('Add New Tag').fill(tagarray[i]);
            await page.getByLabel('Add New Tag').press('Enter');
            await page.pause();
        }
        
    }

    
})

test('Create the post Tag from the Post itself',async({page}) => {

    //variable initilizating 
    var gotoURL='https://qa-tests.d3.rgbc.dev/wp-admin/';
    var username='k@codja.net';
    var password='Z86mS9rSJ8';
    var loginTitle = 'Log In ‹ qa-tests.d3.rgbc.dev — WordPress';
    var DashBoardTitle='Dashboard ‹ qa-tests.d3.rgbc.dev — WordPress';
    const login_XPath="//input[@id='user_login']";
    const pass_Xpath="//input[@id='user_pass']";
    const tagarray = ["BMW", "Volvo", "Saab", "Ford", "Fiat", "Audi"];
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
        //here we hover the Post tab
        await page.pause();
        await page.getByRole('link', { name: 'Posts', exact: true }).hover();
        //here we check Post tab visible 
        await expect.soft(page.getByRole('link', { name: 'Posts', exact: true })).toBeVisible();
        //here we click customize tab  
        await page.getByRole('link', { name: 'Posts', exact: true }).click();
        await page.pause();
        await page.locator("//td[@class='title column-title has-row-actions column-primary page-title']").first().hover();
        await page.getByRole('button', { name: 'Quick edit “Hello World” inline' }).click();
        await page.getByRole('combobox', { name: 'Tags' }).click();
        await page.getByRole('combobox', { name: 'Tags' }).fill(tagarray.reduce(
            (prev,tags)=>{
                return `${prev}, ${tags}`
            },""
        ));
        await page.getByRole('combobox', { name: 'Tags' }).press('Enter');
        
        await page.pause();
       
        
    }

    
})

