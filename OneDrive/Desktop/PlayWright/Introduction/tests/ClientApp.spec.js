const {test, expect} = require ('@playwright/test');

test ('@Web Client App Login', async ({page})=>
{
    const email = "ajique.QA@protonmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Testing123!");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();

    console.log(titles);
    const count = await products.count();
    for (let i = 0; i < count; ++i)
    {
        if (await products.nth(i).locator("b").textContent() === productName)
        {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();

    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();

    await page.getByPlaceholder('Select Country').pressSequentially("ind", {delay:150})
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    //await dropdown.getByRole("button", { name: " India" }).first().click();
    // Ensures to get " India" and NOT "British Indian Ocean Territory"
    await dropdown.locator("button").filter({ hasText: /^ India$/ }).click();
    /*const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i <optionsCount; ++i)
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === "India")
        {
            await dropdown.locator("button").nth(i).click();
            break;  
        }
    }
    */

    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click({force: true});
    await page.waitForLoadState('networkidle');
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
     
    
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for(let i = 0; i < await rows.count(); ++i)
    {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderID.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderID.includes(orderIdDetails)).toBeTruthy();

});

