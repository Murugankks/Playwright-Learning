const {test, expect} = require('@playwright/test');
test("Handling dynamic drop down",async({page})=>
{
    const departSearch = page.locator("#input-with-icon-adornment");
    await page.goto("https://www.yatra.com/");
    await page.locator("p:has-text('Departure From')").click();
    await departSearch.clear();
    await departSearch.pressSequentially("New", {delay:1000});
    await page.locator("div[class='MuiBox-root css-134xwrj'] >> text=New Haven").nth(0).click();

    //new branch
});