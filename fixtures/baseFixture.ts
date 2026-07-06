import { test as base } from '@playwright/test';
import { InventoryPage } from '../pages/inventoryPage';

type MyFixtures = {
  inventoryPage: InventoryPage;
};

export const test = base.extend<MyFixtures>({

  inventoryPage: async ({ page }, use) => {

    const inventoryPage = new InventoryPage(page);

    // Open inventory page
    await page.goto('https://www.saucedemo.com/inventory.html');

    // Provide fixture
    await use(inventoryPage);
  }

});

export { expect } from '@playwright/test';