import { test as base, expect, type Page } from '@playwright/test';
import { LoginPage, CartPage, InventoryPage, ItemDetailPage, CheckoutStepOnePage, CheckoutStepTwoPage, CheckoutCompletePage } from '../pages';

export type TestFixture = {
  loginPage: LoginPage;
  cartPage: CartPage;
  inventoryPage: InventoryPage;
  itemDetailPage: ItemDetailPage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  checkoutCompletePage: CheckoutCompletePage;
};

export const test = base.extend<TestFixture>({
  loginPage: async ({ page }: { page: Page }, use: (p: LoginPage) => Promise<void>) => {
    await use(new LoginPage(page));
  },
  cartPage: async ({ page }: { page: Page }, use: (p: CartPage) => Promise<void>) => {
    await use(new CartPage(page));
  },
  inventoryPage: async ({ page }: { page: Page }, use: (p: InventoryPage) => Promise<void>) => {
    await use(new InventoryPage(page));
  },
  itemDetailPage: async ({ page }: { page: Page }, use: (p: ItemDetailPage) => Promise<void>) => {
    await use(new ItemDetailPage(page));
  },
  checkoutStepOnePage: async ({ page }: { page: Page }, use: (p: CheckoutStepOnePage) => Promise<void>) => {
    await use(new CheckoutStepOnePage(page));
  },
  checkoutStepTwoPage: async ({ page }: { page: Page }, use: (p: CheckoutStepTwoPage) => Promise<void>) => {
    await use(new CheckoutStepTwoPage(page));
  },
  checkoutCompletePage: async ({ page }: { page: Page }, use: (p: CheckoutCompletePage) => Promise<void>) => {
    await use(new CheckoutCompletePage(page));
  },
});

export { expect };
