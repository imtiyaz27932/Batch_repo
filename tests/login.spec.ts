// tests/login.spec.ts

import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
test.describe('SauceDemo Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Login with valid credentials', async () => {
    await loginPage.validLogin();
  });

  test('Login with invalid credentials', async () => {
    await loginPage.invalidLogin();
  });

  test('Login with empty credentials', async () => {
    await loginPage.emptyCredentialsLogin();
  });
});