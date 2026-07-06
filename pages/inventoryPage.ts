// pages/InventoryPage.ts

import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly firstAddToCartButton: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.locator('.title');
    this.firstAddToCartButton = page.locator('.inventory_item button').first();
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async verifyInventoryPageLoaded() {
    await expect(this.pageTitle).toHaveText('Products');
  }

  async addFirstProductToCart() {
    await this.firstAddToCartButton.click();
  }

  async verifyCartItemCount(expectedCount: string) {
    await expect(this.cartBadge).toHaveText(expectedCount);
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.page.waitForTimeout(1000);
    await this.logoutLink.click();
  }

  async addProductAndOpenCart() {
    await this.addFirstProductToCart();
    await this.verifyCartItemCount('1');
    await this.openCart();
  }
}