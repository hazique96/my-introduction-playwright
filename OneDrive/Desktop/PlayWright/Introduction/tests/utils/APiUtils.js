/*
class APiUtils {
    constructor(apiContext, loginPayLoad){
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken (){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{ data: this.loginPayLoad});
        const loginResponseJson = await loginResponse.json();
        const token = loginResponse.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayLoad){
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("", 
            {
                data: orderPayLoad,
                headers: {
                    'Authorization' : response.token,
                   'Content-Type' : 'application/json'
                }
            }
        );

        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;

        return response;
    }
    
}

module.exports = {APiUtils};
*/

//-------------------------------------this is clean up version---------------------------------------------

class APiUtils{
    constructor(apiContext, loginPayLoad){
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    //Purpose: Authenticate and get a bearer token
    async getToken(){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
            data: this.loginPayLoad
        });

        const loginResponseJson = await loginResponse.json();
        return loginResponseJson.token; //We return the string to be used in other requests
    }

    //Purpose: Create  an order via API so we dont have to click through the checkout UI
    async createOrder(orderPayLoad){
        let response = {};
        response.token = await this.getToken(); // Step 1: Get token

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'Authorization' : response.token, // Step 2: Use token for authorization
                'Content-Type' : 'application/json'
            }
        });

        const orderResponseJson = await orderResponse.json();
        response.orderId = orderResponseJson.orders[0]; //Extract the order ID
        return response; //Return object containing both token and orderID

    }
}

module.exports = {APiUtils};