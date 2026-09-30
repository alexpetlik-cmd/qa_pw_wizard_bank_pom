import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerName = page.locator('#userSelect');
    this.currency = page.locator('#currency');
    this.processButton = page.locator('button[type="submit"]');
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }
  async selectCustomer(customerName) {
    await this.customerName.selectOption({ label: customerName });
  }

  async selectCurrency(currency) {
    await this.currency.selectOption({ label: currency });
  }

  async submitForm() {
    await this.processButton.click();
  }

  async getAlertText() {
    const alert = await this.page.waitForEvent('dialog');
    const alertText = alert.message();
    await alert.accept();
    return alertText;
  }
}