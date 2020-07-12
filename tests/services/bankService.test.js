const BankService = require('../../src/services/bankService');
const Customer = require('../../src/models/customer');
const Account = require('../../src/models/account');
const { CAD, USD, PESO } = require('../../src/models/currencyType');

test('isCustomerValid_whenNoCustomersExist_returnsUndefined', () => {
  const customers = [];
  const result = BankService.isCustomerValid(1, customers);
  expect(result).toBeUndefined();
});

test('isCustomerValid_whenInvalidCustomersUsed_returnsUndefined', () => {
  const customers = []; const customerAccounts = [];
  const customer = new Customer(1, 'John Doe', 'John.Doe@acme.com', customerAccounts);
  customers.push(customer);
  const result = BankService.isCustomerValid(2, customers);
  expect(result).toBeUndefined();
});

test('isCustomerValid_whenValidCustomersUsed_returnsCustomer', () => {
  const customers = []; const customerAccounts = [];
  const customer = new Customer(1, 'John Doe', 'John.Doe@acme.com', customerAccounts);
  customers.push(customer);
  const result = BankService.isCustomerValid(1, customers);
  expect(result.id).toBe(1);
});

test('isAuthorizedOnAccount_whenNoAccountsExist_returnsNull', () => {
  const customerAccounts = [];
  const customer = new Customer(100, 'John Doe', 'John.Doe@acme.com', customerAccounts);
  const accounts = [];
  const result = BankService.isAuthorizedOnAccount(customer, 1, accounts);
  expect(result).toBeNull();
});

test('isAuthorizedOnAccount_whenInvalidAccountsUsed_returnsNull', () => {
  const accounts = [];
  const account = new Account(1, 100.00);
  const customerAccounts = [];
  customerAccounts.push(account);
  const customer = new Customer(100, 'John Doe', 'John.Doe@acme.com', customerAccounts);
  accounts.push(account);
  const result = BankService.isAuthorizedOnAccount(customer, 2, accounts);
  expect(result).toBeNull();
});

test('isAuthorizedOnAccount_whenValidAccountsUsed_returnsAccount', () => {
  const accounts = [];
  const account = new Account(1, 100.00);
  const customerAccounts = [];
  customerAccounts.push(account);
  const customer = new Customer(100, 'John Doe', 'John.Doe@acme.com', customerAccounts);
  accounts.push(account);
  const result = BankService.isAuthorizedOnAccount(customer, 1, accounts);
  expect(result.id).toBe(1);
});

test('convertCurrency_whenCalledWithUSDType_returnsConvertedAmount', () => {
  const convertedAmount = BankService.convertCurrency(100, USD);
  expect(convertedAmount).toBe(200);
});

test('convertCurrency_whenCalledWithPESOType_returnsConvertedAmount', () => {
  const convertedAmount = BankService.convertCurrency(100, PESO);
  expect(convertedAmount).toBe(10);
});

test('convertCurrency_whenCalledWithCADType_returnsUnconvertedAmount', () => {
  const convertedAmount = BankService.convertCurrency(100, CAD);
  expect(convertedAmount).toBe(100);
});

test('convertCurrency_whenCalledWithUnknownType_returnsUnconvertedAmount', () => {
  const convertedAmount = BankService.convertCurrency(100, -1);
  expect(convertedAmount).toBe(100);
});

test('convertCurrency_whenCalledWithCADType_returnsResultToBeRoundedUp', () => {
  const convertedAmount = BankService.convertCurrency(100.867, CAD);
  expect(convertedAmount).toBe(100.87);
});

test('convertCurrency_whenCalledWithCADType_returnsResultToBeRoundedDown', () => {
  const convertedAmount = BankService.convertCurrency(100.993, CAD);
  expect(convertedAmount).toBe(100.99);
});

test('hasSufficientFundsForWithdrawal_whenFundsAreSufficient_returnsTrue', () => {
  let account = new Account(1, 100.00);
  let result = BankService.hasSufficientFundsForWithdrawal(account, 99.99);
  expect(result).toEqual(true);
  account = new Account(1, 99.99);
  result = BankService.hasSufficientFundsForWithdrawal(account, 99.99);
  expect(result).toEqual(true);
});

test('hasSufficientFundsForWithdrawal_whenFundsAreNotSufficient_returnsFalse', () => {
  const account = new Account(1, 99.98);
  const result = BankService.hasSufficientFundsForWithdrawal(account, 99.99);
  expect(result).toEqual(false);
});
