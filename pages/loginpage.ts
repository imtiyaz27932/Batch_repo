// pages/LoginPage.ts

import { Page, Locator, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto(process.env.BASE_URL!);
  }

  async validLogin() {
    await this.usernameInput.fill(process.env.STANDARD_USER!);
    await this.passwordInput.fill(process.env.PASSWORD!);
    await this.loginButton.click();

    await expect(this.page).toHaveURL(/inventory.html/);
  }

  async invalidLogin() {
    await this.usernameInput.fill(process.env.STANDARD_USER!);
    await this.passwordInput.fill('wrong_password');
    await this.loginButton.click();

    await expect(this.errorMessage).toBeVisible();
  }

  async emptyCredentialsLogin() {
    await this.loginButton.click();

    await expect(this.errorMessage).toBeVisible();
  }
}