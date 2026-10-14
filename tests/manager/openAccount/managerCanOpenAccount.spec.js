import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage.js';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';

let firstName;
let lastName;
let postCode;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.open();
  
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();

  await addCustomerPage.fillCustomerForm(firstName, lastName, postCode);
  await addCustomerPage.submitCustomerForm();
  await page.reload();
});

test('Assert manager can add new customer', async ({ page }) => {

  await page.getByRole('button', { name: 'Open Account' }).click(); 


  const openAccountPage = new OpenAccountPage(page);
  await openAccountPage.selectCustomer(`${firstName} ${lastName}`);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.submitForm();
  await page.reload();

  await page.getByRole('button', { name: 'Customers' }).click();
  
  const lastRow = page.locator('table tbody tr').last();
  const accountNumberCell = lastRow.locator('td').nth(3);
  
  await expect(accountNumberCell).not.toBeEmpty();
});
