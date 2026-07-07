// tests/inventory.spec.ts

import { test } from '@playwright/test';
import { InventoryPage } from '../pages/inventoryPage'
import { logger } from '../utils/logger';

test.describe('SauceDemo Inventory Module', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);

    // Since session is already stored, directly open inventory page
    logger.info('Navigating to inventory page');
    await page.goto('https://www.saucedemo.com/inventory.html');
  });

  test('Verify inventory page loads successfully @smoke', async () => {
    logger.info('Verifying inventory page loads successfully');
    await inventoryPage.verifyInventoryPageLoaded();
  });

  test('Add product to cart successfully @smoke', async () => {
    await inventoryPage.addProductAndOpenCart();
  });

  test('Logout successfully', async () => {
    await inventoryPage.logout();
  });
});