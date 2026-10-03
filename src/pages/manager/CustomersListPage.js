import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchCustomerInput = page.locator('input[placeholder="Search Customer"]');
    this.tableRows = page.locator('table tbody tr');
    this.deleteButton = (customerName) => page.locator(`table tbody tr:has-text("${customerName}") button[ng-click="deleteCust(cust)"]`);
  }
  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/list',
    );
  }async searchCustomer(text) {
    await this.searchCustomerInput.fill(text);
  }

  async searchCustomerByFirstName(firstName) {
    await this.searchCustomer(firstName);
  }

  async searchCustomerByLastName(lastName) {
    await this.searchCustomer(lastName);
  }

  async searchCustomerByPostCode(postCode) {
    await this.searchCustomer(postCode);
  }
  async deleteCustomerByName(customerName) {
    await this.deleteButton(customerName).click();
  }
}
