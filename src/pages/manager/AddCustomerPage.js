import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
  this.openAccountButton = page.getByRole('button', { name: 'Add Customer' }).first();
     this.firstNameInput = page.locator('input[placeholder="First Name"]');
    this.lastNameInput = page.locator('input[placeholder="Last Name"]');
    this.postCodeInput = page.locator('input[placeholder="Post Code"]');
    this.addCustomerSubmitButton = page.locator('button[type="submit"]');
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async fillCustomerForm(firstName, lastName, postCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postCodeInput.fill(postCode);
  }

  async submitCustomerForm() {
    await this.addCustomerSubmitButton.click();
  }

  async getAlertText() {
    const alert = await this.page.waitForEvent('dialog');
    const alertText = alert.message();
    await alert.accept();
    return alertText;
  }
  async clickOpenAccountButton() {
    await this.openAccountButton.click();
  }
}
