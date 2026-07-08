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

    //Step 2: Ensure synchronization after login redirect completed 
    //Locate the email entry element input box and fill it with target user credentials 
    await page.locator("#userEmail").fill("ajique.QA@protonmail.com");
    //Locate the password entry element input box and fill it with target user credentials
    await page.locator("#userPassword").fill("Testing123!");
    //Locate the login button and click it to submit the authentication form
    await page.locator("[value='Login']").click();

    //Step 3: Navigat straight to the user Orders History table panel view screen
    await page.locator("button[routerlink*='myorders']").click();

    //Step 4: Security Tampering Route Interception (The Middleware Hack)
    //We catch the outgoing API request right before it leaves the application client space
    //The '*' acts as a wildcard string matches whatever order ID button the user actually clicks 
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", async route => {
        
        //Manipulate the target URL parameter string parameter values diractly on the request object  
        //route.continue tells playwright to allow request to leave, but forward it using  our HACKED URL string instead
        //We substitute the user's authentic order ID palyload string with a different user's hijacked order ID block    
        await route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' });
    });

    //Step 5: Tirgger the intercepted fetch request cycle action
    //Click the very first visual order details 'View' button link cell item listed on the table panel layout
    await page.locator("button:has-text('View')").first().click();

    //Step 6: Security Boundary Assertion Validation (The Guatdian Check)
    //Scrape the final UI text container error block layout message string content rendered by the app framework
    const secureErrorMessageLocator = page.locator("p").last();

    // Assert that the server successfully identified the authorization mismatch error response
    // If the test passes, it means the app is SECURE. If it fails (shows the order info), it means the system is VULNERABLE to hackers!
    await expect(secureErrorMessageLocator).toContainText("You are not authorized to view this order");
})