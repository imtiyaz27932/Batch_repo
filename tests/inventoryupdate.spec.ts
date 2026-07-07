// import { test } from '../fixtures/baseFixture';
// import { logger } from '../utils/logger';

// test.describe('SauceDemo Inventory Module', () => {

//   test('Verify inventory page loads successfully', async ({
//     inventoryPage
//   }) => {

//     logger.info('Verifying inventory page');

//     await inventoryPage.verifyInventoryPageLoaded();

//     logger.success('Inventory page verified successfully');
//   });


//   test('Add product to cart successfully', async ({
//     inventoryPage
//   }) => {

//     logger.info('Adding product to cart');

//     await inventoryPage.addProductAndOpenCart();

//     logger.success('Product added to cart successfully');
//   });


//   test('Logout successfully', async ({
//     inventoryPage
//   }) => {

//     logger.info('Performing logout');

//     await inventoryPage.logout();

//     logger.success('Logout successful');
//   });

// });


import { test, expect } from '../fixtures/baseFixture';
import { InventoryUtils } from '../utils/inventoryUtils';
import testData from '../testdata.json';

test.describe('SauceDemo Inventory Module', () => {

  test('Verify inventory page loads successfully @smoke', async ({
    inventoryPage
  }) => {

    await InventoryUtils.verifyInventoryPage(
      inventoryPage
    );
  });

  test('Verify inventory page title using testdata.json', async ({
    inventoryPage
  }) => {

    await inventoryPage.verifyInventoryPageLoaded();
    await expect(inventoryPage.pageTitle).toHaveText(
      testData.inventoryPageTitle
    );
  });

  test('Add product to cart successfully', async ({
    inventoryPage
  }) => {

    await InventoryUtils.addProductToCart(
      inventoryPage
    );
  });

  
  test('Logout successfully', async ({
    inventoryPage
  }) => {

    await InventoryUtils.logoutFromApplication(
      inventoryPage
    );
  });

});