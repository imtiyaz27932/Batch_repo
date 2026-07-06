import { InventoryPage } from '../pages/inventoryPage';
import { logger } from './logger';

export class InventoryUtils {

  static async verifyInventoryPage(
    inventoryPage: InventoryPage
  ) {

    logger.info('Verifying inventory page');

    await inventoryPage.verifyInventoryPageLoaded();

    logger.success('Inventory page verified successfully');
  }


  static async addProductToCart(
    inventoryPage: InventoryPage
  ) {

    logger.info('Adding product to cart');

    await inventoryPage.addProductAndOpenCart();

    logger.success('Product added to cart successfully');
  }


  static async logoutFromApplication(
    inventoryPage: InventoryPage
  ) {

    logger.info('Performing logout');

    await inventoryPage.logout();

    logger.success('Logout successful');
  }

}