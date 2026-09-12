/*
End-to-end checkout flow:

1. Login as a standard user
2. Navigate to the inventory page
3. Add the first item to the cart
4. Navigate to the cart page
5. Proceed through Checkout Step One and Checkout Step Two
6. Enter checkout details and complete the order

This test exercises the full happy-path: authentication, product selection,
cart validation, checkout form submission, and order confirmation.
*/

import { credentials } from '../config/credentials';
import { test, expect } from '../fixtures/test-base';
import DataGenerator from '@src/utils/DataGenerator';
import { createLogger } from '@src/utils/logger';
import { visualStep } from '@utils/visualStep';

import * as fs from 'fs';
// First product card on the TTACart inventory page.
const FIRST_ITEM_ID = 'test-allthethings-tshirt-red';

test.describe('E2E checkout flow', () => {
    test.beforeEach(async ({ loginPage }) => {
        // Open login page and authenticate as standard user -==(from .env)
        // const USER = process.env.STANDARD_USER ?? 'standard_user';
        // const PASS = process.env.STANDARD_PASS ?? 'secret_sauce';
        await loginPage.open();
        await loginPage.LoginAs(credentials.standard_user, credentials.standard_pass);
    });
   
        test('complete checkout happy-path', async ({ page, inventoryPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage }) => {
            const log = createLogger('E2E-Checkout');
            const info = test.info();
            let stepIndex = 0;

            const customer = DataGenerator.checkoutCustomer();

        // Step 2 — inventory
        await visualStep(page, 'Go to the inventory page', async () => {
            log.info('Step 2: navigating to the inventory page');
            await inventoryPage.open();
        });

        // Step 3 — add one item
        await visualStep(page, 'Add one item to the cart', async () => {
            log.info(`Step 3: adding item "${FIRST_ITEM_ID}" to the cart`);
            await inventoryPage.addToCart(FIRST_ITEM_ID);
        });

        // Step 4 — cart, then checkout step one + step two
        await visualStep(page, 'Open the cart', async () => {
            log.info('Step 4: opening the cart and verifying one row');
            await cartPage.open();
            expect(await cartPage.rowCount()).toBe(1);
        });

        await visualStep(page, 'Fill guest details (checkout step one)', async () => {
            log.info(`Step 5a: filling guest details for ${customer.firstName} ${customer.lastName}`);
            await cartPage.checkout();
            await checkoutStepOnePage.assertLoaded();
            await checkoutStepOnePage.fillGuest(customer);
            await checkoutStepOnePage.continue();
        });

        await visualStep(page, 'Finish the order (checkout step two)', async () => {
            log.info('Step 5b: reviewing the overview and finishing the order');
            await checkoutStepTwoPage.assertLoaded();
            await checkoutStepTwoPage.finish();
        });

        // Step 5 — order complete
        await visualStep(page, 'Order is complete', async () => {
            log.info('Step 6: asserting the order is complete');
            await checkoutCompletePage.assertOrderComplete();
        });
    });



    });