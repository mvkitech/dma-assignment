const { DEPOSIT, WITHDRAWAL } = require('./transactionType');

// Note: Please observe that the code here has been setup as a class
//       and I likely would have chosen a different approach had there
//       been a database to hook this model up to. In other words I
//       would have used something like a "mongoose.Schema" instead
//       of creating a class and with the schema I would have added
//       code to make sure certain properties were setup with their
//       data types and whether or not they were required fields.

module.exports = class Transaction {
  constructor(customerId, accountId, transactionType, currencyType, amount) {
    this.customerId = customerId;
    this.accountId = accountId;
    this.transactionType = transactionType;
    this.currencyType = currencyType;
    this.amount = amount;
  }

  isDeposit() {
    return transactionType === DEPOSIT;
  }

  isWithdrawal() {
    return transactionType === WITHDRAWAL;
  }
};
