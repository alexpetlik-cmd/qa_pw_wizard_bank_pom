
import { faker } from '@faker-js/faker';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { test, expect } from '@playwright/test';

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

test('Assert manager can search customer by First Name', async ({ page }) => {
  /* 
  Test:
  1. Open Customers page.
  2. Fill the firstName to the search field.
  3. Assert customer row is present in the table.
  4. Assert no other rows is present in the table.
  */
  await customersListPage.open(); 
 await customersListPage.searchCustomer(firstName);
  const firstRow = customersListPage.tableRows.first();
  await expect(firstRow.locator('td').nth(0)).toHaveText(firstName);
  await expect(customersListPage.tableRows).toHaveCount(1);
});
