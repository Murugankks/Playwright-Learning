const {test, expect} = require('@playwright/test');
const exp = require('constants');

test("Launch Udemy's RahulShetty Web Page",async({ page })=>
{
// const context = await browser.newContext();
// const page  = await context.newPage();
const username = page.locator("#username");
const password = page.locator("[type=password]");
const cartTitles = page.locator(".card-title a");

await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
console.log(await page.title());
await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

await username.fill('rahulshetty');
await username.fill("");//clear the text
await username.fill("rahulshettyacademy");
await password.fill('23456');//original password : 'learning'
await page.locator("[value='Sign In']").click();
console.log(await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toContainText("Incorrect");

await password.fill("");
await password.fill("learning");
await page.locator("[value='Sign In']").click();
console.log(await cartTitles.first().textContent());// picking the 0th index (first element)
console.log(await cartTitles.nth(1).textContent());// print the second the element in the cart titles list
//allTextContent() doesn't have inbuilt wait in it like textContent().
//if I executed the allTextConbtent fun before the textContent() fun, that would returned an empty array insatead of 4 elememnts.
//So we can write this wait fun
await cartTitles.first().waitFor();//wait until the cart titles are loaded
console.log(await cartTitles.nth(1).textContent()); // print the second element in the card titles list
console.log(await cartTitles.allTextContents());
});

test.only("Handling UI Drop-Down, Radio Button, Child Windows and assertions", async({ page })=>
{
    const username = page.locator("#username");
    const password = page.locator("[type=password]");
    const dropdown  = page.locator("select.form-control");
    const blinkText = page.locator("[target='_blank']");


    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await dropdown.selectOption("Teacher");
    await page.locator("span.checkmark").nth(1).click();
    await page.locator("#okayBtn").click();
   // await page.pause();// pause the web page to check if the desired drop down is selected or not
    await page.locator("[type='checkbox']").click();//clicking the check box
    await expect(page.locator("[type='checkbox']")).toBeChecked();
    await page.locator("[type='checkbox']").uncheck();// un click the checkbox
    expect(await page.locator("[type='checkbox']").isChecked()).toBeFalsy();// there is no direct assertion function like toBeNotChecked, so checked it like is to be falsy
    await expect(blinkText).toHaveAttribute("class","blinkingText");

});