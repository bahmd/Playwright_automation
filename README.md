# Playwright Checkout Automation

## 🧩 About
This project automates the complete checkout flow on [Practice Software Testing](https://practicesoftwaretesting.com).  
The automated test covers the following steps:
1. Navigate to the website
2. Add a product to the cart
3. Go to the cart page
4. Log in during checkout
5. Enter shipment information
6. Complete the payment process
7. Validate the invoice information on the confirmation page

## 🧰 Tech Stack
- [Playwright](https://playwright.dev/)
- Node.js 18+
- JavaScript / TypeScript

## ⚙️ Setup
### 1. Clone the repository
```
git clone https://github.com/<your-username>/playwright-checkout-automation.git
cd playwright-checkout-automation
```
### 2. Install dependencies
Make sure you have Node.js 18+ installed, then run:
```
npm install
```

### 3. Install Playwright browsers
Playwright needs to download browser binaries (Chromium, Firefox, WebKit). Run:
```
npx playwright install
```

## ▶️ Run the test
To execute the checkout test, run:
```
npx playwright test checkout.spec.js
```
Optional flags:
- --project=chromium → run only on Chrome
- --headed → show the browser UI during execution
- --debug → enable Playwright debug mode

## 🧪 Generate report
To open the Playwright HTML test report:<br>
```
npx playwright show-report
```
