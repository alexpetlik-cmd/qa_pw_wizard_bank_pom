import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchCustomerInput = page.locator('input[placeholder="Search Customer"]');
    this.tableRows = page.locator('table tbody tr');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async searchCustomer(text) {
    await this.searchCustomerInput.fill(text);
  }

  async deleteCustomerByName(name) {
    const row = this.page.locator(`table tbody tr:has-text("${name}")`);
    await row.locator('button').click();
  }
}
