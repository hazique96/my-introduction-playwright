
const {test, expect} = require ('@playwright/test')

test ("Popup Validations ", async({page}) =>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://www.google.com");
    await page.goBack();
    //await page.goForward();

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    await page.locator("#confirmbtn").click();
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#mousehover').hover();
    const framesPage = page.frameLocator
})

