/*
const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require ('../utils/APiUtils');
const loginPayLoad = {userEmail:"ajique.QA@protonmail.com",userPassword:"Testing123!"};
const orderPayLoad = {orders: [{ country: "India", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };
const fakePayLoadOrders = {data: [], message: "No order"};

let response;
test.beforeAll(async () =>{
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext,loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
})

//create order is success
test('@SP Place the order', async ({page}) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill(
                {
                    response,
                    body,s
                }
            );
        }
    );

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")

    console.log(await page.locator(".mt-4").textContent());
})
*/

//-------------------------------------this is clean up version---------------------------------------------

//Import necessary modules from the Playwright testing library