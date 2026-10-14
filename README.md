# Playwright: Wizard Bank Test Project

End-to-end tests for the Wizard Bank demo application using Playwright and Page Object Model.

## Technologies
- Playwright
- Page Object Model
- Faker.js

## Test Coverage

**Customer:**
- Account operations (deposit, withdraw)
- Transactions
- Logout

**Manager:**
- Bank Manager login
- Add new customer
- Open account for customer
- Search customer
- Delete customer

## How to Run

```bash
npm install
npx playwright install
npx playwright test
npx playwright show-report
```

## Project Structure
- `src/pages/` — Page Objects
- `tests/customer/` — Customer tests
- `tests/manager/` — Manager tests
