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
  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table.
  4. Reload the page.
  5. Assert customer row is not present in the table.
  */
  await customersListPage.open(); 
  await customersListPage.deleteCustomerByName(firstName);
  await expect(customersListPage.tableRows).toHaveCount(5);
  const deletedRow = page.locator(`table tbody tr:has-text("${firstName}")`);
  await expect(deletedRow).toBeHidden();
  await page.reload();
  await expect(customersListPage.tableRows).toHaveCount(5);
  await expect(deletedRow).toBeHidden();
});

