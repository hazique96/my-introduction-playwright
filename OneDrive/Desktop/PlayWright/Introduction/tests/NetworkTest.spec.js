// const { test,expect } = require('@playwright/test');
 
 
// test('@QW Security test request intercept', async ({ page }) => {
 
//     //login and reach orders page
//     await page.goto("https://rahulshettyacademy.com/client");
//     await page.locator("#userEmail").fill("ajique.QA@protonmail.com");
//     await page.locator("#userPassword").fill("Testing123!");
//     await page.locator("[value='Login']").click();
//     await page.waitForLoadState('networkidle');
//     await page.locator(".card-body b").first().waitFor();
 
//     await page.locator("button[routerlink*='myorders']").click();
//     await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
//         route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
//     await page.locator("button:has-text('View')").first().click();
//     await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

// })

//-------------------------------------this is clean up version---------------------------------------------

//Import the essential test and expect modules from the Playwright test runner framework 
const {test, expect} = require('@playwright/test');

//Define a security focused test block targeting request interception vulnerabilities 
test ('@QW Security test request intercept (BOLA/IDOR)', async ({page}) => {
    //Step 1: Standard UI Authenticatio Flow 
    //Navigate the browser instance directly to the client application login portal landing page
    await page.goto("https://rahulshettyacademy.com/client");

    //Locate the email entry element input box and fill it with target user credentials 
    await page.locator().fill();
})