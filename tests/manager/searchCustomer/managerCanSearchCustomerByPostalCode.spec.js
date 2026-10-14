import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { expect } from '@playwright/test';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();
  await addCustomerPage.open();
  await addCustomerPage.fillCustomerForm(firstName, lastName, postalCode);
  await addCustomerPage.submitCustomerForm();
});

test('Assert manager can search customer by Postal Code', async ({ page }) => {
const customersListPage = new CustomersListPage(page);
  /* 
  Test:
  1. Open Customers page.
  2. Fill the postalCode to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */
 await customersListPage.open();
 await customersListPage.searchCustomerByPostCode(postalCode);
  const firstRow = customersListPage.tableRows.first();
  await expect(firstRow.locator('td').nth(2)).toHaveText(postalCode);
  await expect(customersListPage.tableRows).toHaveCount(1);
});
