/*
const {test, expect, request} = require ('@playwright/test');
const {APiUtils} = require ('./utils/APiUtils');
const loginPayLoad = {userEmail:"ajique.QA@protonmail.com",userPassword:"Testing123!"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"67a8dde5c0d3e6622a297cc8"}]};

let response;
test.beforeAll( async () => 
{
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext,loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
})

test('@API Place the order', async ({page})=>
{
    await page.addInitScript(value => {window.localStorage.setItem('token',value);}, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for(let i=0; i<await rows.count(); i++)
    {
        const rowOrderId = await row.nth(i).locator("th").textContent();
        if(response.orderId.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first.click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    //await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});
*/


//-------------------------------------this is clean up version---------------------------------------------

const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('../utils/APiUtils'); // Note: ../ moves up one folder

//1. Data Setup(Constants)
const loginPayLoad = { userEmail:"ajique.QA@protonmail.com",userPassword:"Testing123!"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"67a8dde5c0d3e6622a297cc8"}]};

let apiResponse; //Global variable to store Token and Order ID  for the Ui test

//2. Pre-condition (Run before any test)
test.beforeAll(async () => {
    const apiContext = await request.newContext(); //Creates separate "browserless" context
    const apiUtils = new APiUtils(apiContext, loginPayLoad);
    apiResponse = await apiUtils.createOrder(orderPayLoad); //Store order details
});

test ('@API Place the order and verify history', async ({page}) => {
    //3. Secure LOGIN bypass (Injected Token)
    //We inject the token into LocalStorage so the website thinks we are already logged in
    await page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    }, apiResponse.token);
    
    //4. Navigate directly to Dashboard (Skipping Login Page)
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();

    //5. Verify the Order ID in the History Table 
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");

    for(let i=0; i< await rows.count(); ++i){
        const rowOrderId = await rows.nth(i).locator("th").textContent();

        //Use .trim() to avoid issues with hidden spaces
        if (apiResponse.orderId.includes(rowOrderId.trim())){
            await rows.nth(i).locator("button").first().click(); //Click "View"
            break;
        }
    }
    
    //6. Final Assertion
    const orderIdDetails = await page.locator().textContent();
    expect(apiResponse.orderId.includes(orderIdDetails.trim())).toBeTruthy();
});