import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';

let firstName;
let lastName;
let postalCode;
let customersListPage;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.open();
  
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  await addCustomerPage.fillCustomerForm(firstName, lastName, postalCode);
  await addCustomerPage.submitCustomerForm();
  await page.reload();

  customersListPage = new CustomersListPage(page);
});

test('Assert manager can delete customer', async ({ page }) => {
  await customersListPage.open();
  await customersListPage.deleteCustomerByName(firstName);

  await expect(page.locator(`table tbody tr:has-text("${firstName}")`)).toHaveCount(0);
  await page.reload();
  await expect(page.locator(`table tbody tr:has-text("${firstName}")`)).toHaveCount(0);
});
