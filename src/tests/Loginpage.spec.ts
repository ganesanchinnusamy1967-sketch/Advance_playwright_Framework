import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('LoginPage tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('can login with valid credentials', async ({ page }) => {
    await test.step('enter credentials and submit', async () => {
      await loginPage.LoginAs('standard_user', 'tta_secret');
    });

    await test.step('verify navigation after login', async () => {
      await expect(page).toHaveURL(/inventory|home|dashboard/i);
    });
  });
});

