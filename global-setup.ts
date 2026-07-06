// global-setup.ts

import { chromium, FullConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment-specific .env file
const env = process.env.ENV || '';
const envFilePath = env ? path.resolve(`.env.${env}`) : path.resolve('.env');

// Load the appropriate .env file
dotenv.config({ path: envFilePath });

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to SauceDemo
  await page.goto(process.env.BASE_URL!);

  // Login once
  await page.fill('#user-name', process.env.STANDARD_USER!);
  await page.fill('#password', process.env.PASSWORD!);
  await page.click('#login-button');

  // Save authenticated session
  await page.context().storageState({ path: 'storageState.json' });

  await browser.close();
}

export default globalSetup;


//$env:ENV='staging'; npx playwright test "inventoryupdate.spec.ts"
//$env:ENV='prod'; npx playwright test "inventoryupdate.spec.ts" -g "SauceDemo\s+Inventory\s+Module"

// global-setup.ts - ADDED LINES:

// Lines 7-15: (Replace dotenv.config(); with:)

// // Load environment-specific .env file
// const env = process.env.ENV || 'dev';
// const envFilePath = path.resolve(`.env.${env}`);

// // Try to load environment-specific file, fall back to .env
// try {
//   dotenv.config({ path: envFilePath });
// } catch (error) {
//   dotenv.config();
// }



// # Development
// npx playwright test "inventoryupdate.spec.ts"

// # Staging
// $env:ENV='staging'; npx playwright test "inventoryupdate.spec.ts"

// # Production
// $env:ENV='prod'; npx playwright test "inventoryupdate.spec.ts"