const {test, expect, chromium} = require('@playwright/test');
const exp = require('constants');
test("Handling dynamic drop down",async({page})=>
{
    const departSearch = page.locator("#input-with-icon-adornment");
    await page.goto("https://www.yatra.com/");
    await page.locator("p:has-text('Departure From')").click();
    await departSearch.clear();
    await departSearch.pressSequentially("New", {delay:1000});
    await page.locator("div[class='MuiBox-root css-134xwrj'] >> text=New Haven").nth(0).click();
    await page.pause();
});

test.only("windows handling", async()=>
{
    // creating multiple pages
    const browser = await chromium.launch();
    const context = await browser.newContext();
    
    const page1 = await context.newPage();
   // const page2 = await context.newPage();

    await page1.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await expect(page1).toHaveTitle("OrangeHRM");

    // await page2.goto("https://demo.cyclos.org/ui/home");
    // await expect(page2).toHaveTitle("Home - Cyclos");

    const newPage = context.waitForEvent('page');
    await page1.locator("a[href='http://www.orangehrm.com']").click();
    await expect(newPage).toHaveTitle("Human Resources Management Software | OrangeHRM HR Software ");

});