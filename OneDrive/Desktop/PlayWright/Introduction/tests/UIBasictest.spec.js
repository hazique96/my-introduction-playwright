const {test, expect} = require ('@playwright/test');

test ('First Playwright test 1', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('[name="username"]');
    const passwordSignIn = page.locator('input[type="password"]');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    await page.locator('[name="username"]').fill("rahulshettyacademy");
    await page.locator('input[type="password"]').fill("qqq");
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await passwordSignIn.fill("");
    await passwordSignIn.fill("learning");
    await page.locator("#signInBtn").click();

    console.log(await page.locator("div.card-body").nth(0).textContent());
});


test.only ('UI Control', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const passwordSignIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption({label: 'Consultant'});
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator (".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect (await page.locator("#terms").isChecked()).toBeFalsy();
    
});

test.only ('UI Control', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     
});
