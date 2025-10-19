import { test, expect } from '@playwright/test';

test('Cart Page - proceed to checkout (Sign in during checkout) ', async ({ page }) => {
    //Defining variables for the test
    const baseUrl = 'https://practicesoftwaretesting.com/';
    const email = 'customer2@practicesoftwaretesting.com';
    const password = 'welcome01';
    const credit_card_number = '1111-1111-1234-4444';
    const expiration_date = '08/2028';
    const cvv = '123';
    const card_holder_name = 'Jack Howe';
    let my_locator;

    // Step 0 (pre condition): Navigate to baseURL and add a product to the cart.
    await page.goto(baseUrl);
    //wait until the fisrt product is visible and click it
    const firstProduct = page.locator('[data-test^="product-"]').first();
    await firstProduct.waitFor({ state: 'visible' });
    await firstProduct.click();
    //add the product to the cart
    await page.locator('[data-test="add-to-cart"]').click();
    //wait for the confirmation toast befor proceeding
    await expect(page.locator('div').filter({hasText: 'Product added to shopping'}).nth(2)).toBeVisible();

    //Step 1: Go to the cart page
    //await page.goto(baseUrl);
    await page.locator('[data-test="nav-cart"]').click();
    await expect(page).toHaveURL(baseUrl+'checkout');

    //Setp 2: Click the "Proceed to checkout" button
    await page.locator('[data-test="proceed-1"]').click();
    my_locator = page.locator('[data-test="email"]');
    await expect(my_locator).toBeVisible({ timeout: 5000 });

    //Step3: Fill in valid matching Email and Password information
    //Click Login
    await page.locator('[data-test="email"]').fill(email);
    await page.locator('[data-test="password"]').fill(password);
    await page.locator('[data-test="login-submit"]').click();
    //verify Login message and buttons are visible
    await expect(page.getByText(/you are already logged in/i)).toBeVisible({ timeout: 10000 });
    my_locator = page.locator('[data-test="proceed-2"]');
    await expect(my_locator).toBeVisible({ timeout: 5000 });

    //Step 4: Click the "Proceed to checkout" button
    await page.locator('[data-test="proceed-2"]').click();
    my_locator = page.locator('[data-test="street"]');
    await expect(my_locator).toBeVisible({ timeout: 5000 });

    //Step 5: Fill in all required fields with valid information and click the "Proceed to checkout" button
    await page.locator('[data-test="street"]').fill('Test street 654');
    await page.locator('[data-test="city"]').fill('Frankfurt');
    await page.locator('[data-test="state"]').fill('Hessen');
    await page.locator('[data-test="country"]').fill('Germany');
    await page.locator('[data-test="postal_code"]').fill('12345');
    //wait for the button to be clickable
    my_locator = page.locator('[data-test="proceed-3"]');
    await expect(my_locator).toBeVisible({ timeout: 5000 });
    //click the button
    await page.locator('[data-test="proceed-3"]').click();
    //wait for the payment method section to be visible
    my_locator = page.locator('[data-test="payment-method"]');
    await expect(my_locator).toBeVisible({ timeout: 5000 });

    //Step 6: Choose Credit Card as payment method from the dropdown menu
    await page.locator('[data-test="payment-method"]').selectOption('credit-card');
    //wait for the credit card fields to be visible
    my_locator = page.locator('[data-test="credit_card_number"]');
    await expect(my_locator).toBeVisible({ timeout: 5000 });

    //Step 7: Fill in all mandatory information for the credit card and click "Confirm"
    await page.locator('[data-test="credit_card_number"]').fill(credit_card_number);
    await page.locator('[data-test="expiration_date"]').fill(expiration_date);
    await page.locator('[data-test="cvv"]').fill(cvv);
    await page.locator('[data-test="card_holder_name"]').fill(card_holder_name);
    //click confirm
    await page.locator('[data-test="finish"]').click();
    //wait for the confirmation message
    await expect(page.locator('div').filter({ hasText: 'Payment was successful' }).nth(5)).toBeVisible();

    //Step 8: Click the "Confirm" button
    await page.locator('[data-test="finish"]').click();
    my_locator = page.getByText('INV-');
    await expect(my_locator).toBeVisible({ timeout: 5000 });

    //get the invoice number from the confirmation page
    const invoiceNumber = await page.getByText('INV-').first().evaluate(el =>
      (el.textContent || '').match(/INV-\d+/)?.[0] ?? null
    );

    //Step 9: Click the user's name on the upper right corner and select the "My invoices" option from the menu
    await page.locator('[data-test="nav-menu"]').click();
    await page.locator('[data-test="nav-my-invoices"]').click();
    //wait for the invoice number to be visible in the list
    await expect(page.getByRole('cell', { name: invoiceNumber })).toBeVisible({ timeout: 5000 });

    //Step 10: Click on the "Details" button for the order just placed (the first item in the list)
    //find the locator that matches the invoice number
    await page.getByRole('row', { name: invoiceNumber}).getByRole('link').click();

    //Step 11: Verify that all information displayed is correct
    //verify invoice number
    await expect(page.locator('[data-test="invoice-number"]')).toHaveValue(invoiceNumber);
    //verify payment information
    await expect(page.locator('[data-test="payment-method"]')).toHaveValue('Credit Card');
    await expect(page.getByRole('textbox', { name: 'Card Holder Name' })).toHaveValue(card_holder_name);
    await expect(page.getByRole('textbox', { name: 'Credit Card Number' })).toHaveValue(credit_card_number);
    await expect(page.getByRole('textbox', { name: 'Cvv' })).toHaveValue(cvv);
    await expect(page.getByRole('textbox', { name: 'Expiration Date' })).toHaveValue(expiration_date);
});