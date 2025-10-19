# Playwright Checkout Automation

## 🧩 About
This project automates a complete checkout flow in [Practice Software Testing](https://practicesoftwaretesting.com):
- Navigate to base url
- Add product to cart
- Navigate to the cart page
- Login during checkout
- Add shipment information
- Complete payment
- Validate invoice information

## 🧰 Tech Stack
- [Playwright](https://playwright.dev/)
- Node.js 18+
- TypeScript/JavaScript

## ▶️ Run the test
npx playwright test checkout.spec.js
  - "--project=chromium" can be used to run only in Chrome
  - "--headed" can be used to have the Chrome window always visible during the test run
  - "--debug" activates the debug mode during the test run

## 🧪 Generate report
Use the following command  line to view the report:<br>
npx playwright show-report
