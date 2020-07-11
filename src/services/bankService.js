const currencyExchange = require('../util/currencyExchange');

module.exports = class BankService {

  /**
   * Helper function used to determine if supplied customer is valid.
   */
  static isCustomerValid(customerId, customers) {
    return customers.find((customer) => customer.id === customerId);
  }

  /**
   * Helper function used to determine if supplied target Customer is allowed 
   * to issue either a Deposit, Withdrawal or Bank Transfer transaction.
   */
  static isAuthorizedOnAccount(customer, accountId, accounts) {

    let targetAccount = null;

    // Ensure "accountId" is a valid request parameter
    const account = accounts.find((account) => account.id === accountId);
    if (account) {

      // Ensure Customer has relationship with target Account
      const customerAccount = customer.accounts.find((ca) => ca.id === accountId);
      if (customerAccount) {
        targetAccount = account;
      }
    }

    return targetAccount;
  }

  /**
   * Helper function to convert the supplied amount into Canadian currency.
   */
  static convertCurrency(amount, sourceCurrencyType) {
    return currencyExchange(amount, sourceCurrencyType);
  }

  /**
   * Helper function used to determine if target Account balance has
   * sufficient funds to cover the widthdrawal request.
   */
  static hasSufficientFundsForWithdrawal(account, withdrawalRequest) {
    return account.balance >= withdrawalRequest;
  }
};
