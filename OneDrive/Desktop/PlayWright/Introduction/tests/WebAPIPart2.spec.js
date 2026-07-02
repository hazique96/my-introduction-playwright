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

const {test, expect, request} = require ('@playwright/test'); //Import necessary modules from the Playwright testing library
const {APiUtils } = require('../utils/APiUtils'); //Import your custom API helper from the utilities folder

const loginPayLoad = {userEmail:"ajique.QA@protonmail.com",userPassword:"Testing123!"}; //Define a constant object for the authentication request payload (Login credential)
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] }; //Define constant object for the order creation request payload (Product & Shipping details)
const fakePayLoadOrders = {data: [], message: "No order"}; //Define a fake/mock payload that simulates an empty orders list from the backend databases

let apiResponse; //Declare a global variable to store the API response details (token and orderID) across hooks

//Setup pre-conditions that run exactly once before any test block in this file executes
test.beforeAll(async () => {
    const apiContext = await request.newContext(); //Create an isolated, browserless network environment context specifically for API request
    const apiUtils = new APiUtils(apiContext, loginPayLoad); //Create new instance of your API utility class, passing the network context and loging
    apiResponse = await apiUtils.createOrder(orderPayLoad); // Execute the createOrder method to log in and generate an order, storing results in our global variable
} );

//Define the test block with a custom tag focus string and grab the visual browser 'page' object
test ('@SP Place the order and mock empty state', async ({page}) => {   
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value); //Manually inject the authentication token into the browser tab's hidden LocalStorage cache
    }, apiResponse.token); //Pass the secure token retrieved from the beforeAll API step into the script
});

//Interceptor rules: Set up network listener to watch for specific backend API request 
//The '*' character acts as a wildcard because the user's customer ID at the end of the URL changes dynamically
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route => {
    const response = await page.request.fetch(route.request()); //Playwright lets the real request go to server and captures the live response  metadata (status code, headers)
    let body = JSON.stringify(fakePayLoadOrders);

    //Fulfill the route by overriding the server response block with our own customize 

});