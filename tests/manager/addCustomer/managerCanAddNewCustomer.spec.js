import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager can add new customer', async ({ page }) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillCustomerForm(firstName, lastName, postCode);
  await addCustomerPage.submitCustomerForm();
  await page.reload();

  await page.getByRole('button', { name: 'Customers' }).click();

  const lastRow = page.locator('table tbody tr').last();
  await expect(lastRow.locator('td').nth(0)).toHaveText(firstName);
  await expect(lastRow.locator('td').nth(1)).toHaveText(lastName);
  await expect(lastRow.locator('td').nth(2)).toHaveText(postCode);
  await expect(lastRow.locator('td').nth(3)).toBeEmpty();
});
