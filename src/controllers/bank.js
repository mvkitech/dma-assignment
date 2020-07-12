const Customer = require('../models/customer');
const Account = require('../models/account');
const Transaction = require('../models/transaction');
const BankService = require('../services/bankService');
const EmailService = require('../services/emailService');
const { DEPOSIT, WITHDRAWAL } = require('../models/transactionType');

// Note: Please be aware that I am not using a database
//       and the existence of the arrays below are acting
//       as the controller's data store. Also be aware
//       that if I was using a database I would have
//       used 'async/await' or "promises" in the code.
const customers = [];
const accounts  = [];
const transactions = [];

/**
 * Used to return all account instances.
 */
exports.getAllAccounts = (req, res) => {
  try {
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({
      message: `Error retrieving accounts: "${error.message}"`,
    });
  }
};

/**
 * Used to return a specific account instance.
 */
exports.getAccount = (req, res) => {
  try {
    const target = accounts.find((account) => account.id === req.params.id);
    if (target) {
      res.status(200).json(target);
    } else {
      res.status(404).json({ message: 'Not Found' });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error retrieving account: "${error.message}"`,
    });
  }
};

/**
 * Used to create a new customer account.
 */
exports.addCustomerAccount = (req, res) => {

  // Note: Please observe that different Id values are being passed into
  //       the request. If I was using a database, this would not be the
  //       case, I would be relying on database to generate the primary
  //       Id values for me. Also note that this code does NOT check for
  //       duplicate Id values since if a database was used, no duplicates
  //       would exist.

  try {

    // Create new Account instance
    const account = new Account(
      req.body.accountId,
      parseFloat(req.body.balance)
    );

    // Determine if Customer is new or already exists
    let customerAccounts = [];
    const customerId = req.body.customerId;
    let customer = customers.find((customer) => customer.id === customerId);
    if (!customer) {

      // Create new Customer instance
      customerAccounts.push(account);
      customer = new Customer(
        customerId,
        req.body.name,
        req.body.email,
        customerAccounts
      );
      customers.push(customer);

    } else {

      // Update Customer Account associations
      customer.accounts.push(account);

    }

    // Add new Account to data store
    accounts.push(account);

    // Return successful response
    res.status(200).json(customer);

  } catch (error) {
    res.status(500).json({
      message: `Error creating customer: "${error.message}"`,
    });
  }
};

/**
 * Used to create a new deposit transaction.
 */
exports.addDeposit = (req, res) => {

  try {

    // Determine if Customer is valid
    const customerId = req.body.customerId;
    const customer = BankService.isCustomerValid(customerId, customers);
    if(customer) {

      // Determine if Customer is authorized on Account
      const accountId = req.body.accountId;
      const account = BankService.isAuthorizedOnAccount(
        customer, 
        accountId,
        accounts
      );
      if (account) {

        // Make sure Deposit amount is in CAD currency
        const originalAmount  = req.body.amount;
        const convertedAmount = BankService.convertCurrency(
          originalAmount, parseInt(req.body.currencyType)
        );

        // Apply Deposit to Account
        account.balance += convertedAmount;

        // Create new Deposit transaction
        const depositTransaction = new Transaction(
          customer.id,
          account.id,
          DEPOSIT,
          req.body.currencyType,
          originalAmount
        );
        transactions.push(depositTransaction);

        // Return successful response
        res.status(200).json(depositTransaction);

      } else {
        res.status(400).json({ message: 'Not Authorized' });
      }

    } else {
        res.status(400).json({ message: 'Invalid Customer' });
    }

  } catch (error) {
    res.status(500).json({
      message: `Error creating deposit: "${error.message}"`,
    });
  }
};

/**
 * Used to create a new withdrawal transaction.
 */
exports.addWithdrawal = (req, res) => {

  try {

    // Determine if Customer is valid
    const customerId = req.body.customerId;
    const customer = BankService.isCustomerValid(customerId, customers);
    if(customer) {

      // Determine if Customer is authorized on Account
      const accountId = req.body.accountId;
      const account = BankService.isAuthorizedOnAccount(
        customer, 
        accountId,
        accounts
      );
      if (account) {

        // Make sure Withdrawal amount is in CAD currency
        const originalAmount  = req.body.amount;
        const convertedAmount = BankService.convertCurrency(
          originalAmount, parseInt(req.body.currencyType)
        );

        // Make sure sufficient withdrawal funds are available
        const hasFunds = BankService.hasSufficientFundsForWithdrawal(
          account, convertedAmount  
        );
        if (hasFunds) {

          // Apply Withdrawal from Account
          account.balance -= convertedAmount;

          // Create new Withdrawal transaction
          const withdrawalTransaction = new Transaction(
            customer.id,
            account.id,
            WITHDRAWAL,
            req.body.currencyType,
            originalAmount
          );
          transactions.push(withdrawalTransaction);

          // Return successful response
          res.status(200).json(withdrawalTransaction);

        } else {
          res.status(400).json({ message: 'Insufficient Funds' });
        }

      } else {
        // Send Customer an email concerning Unauthorized Withdrawal Request
        const message = `Unauthorized Withdrawal Request on Account: "${accountId}"`;
        EmailService(customer.email, message);
        res.status(400).json({ message: 'Not Authorized' });
      }

    } else {
      res.status(400).json({ message: 'Invalid Customer' });
    }

  } catch (error) {
    res.status(500).json({
      message: `Error creating withdrawal: "${error.message}"`,
    });
  }
};

/**
 * Used to create a new transfer transaction.
 */
exports.addTransfer = (req, res) => {

  try {

    // Determine if Customer is valid
    const customerId = req.body.customerId;
    const customer = BankService.isCustomerValid(customerId, customers);
    if(customer) {

      // Determine if Customer is authorized on Account
      const fromAccountId = req.body.fromAccountId;
      const fromAccount = BankService.isAuthorizedOnAccount(
        customer, 
        fromAccountId,
        accounts
      );
      if (fromAccount) {

        // Make sure Transfer amount is in CAD currency
        const originalAmount  = req.body.amount;
        const convertedAmount = BankService.convertCurrency(
          originalAmount, parseInt(req.body.currencyType)
        );

        // Make sure sufficient withdrawal funds are available
        const hasFunds = BankService.hasSufficientFundsForWithdrawal(
          fromAccount, convertedAmount  
        );
        if (hasFunds) {

          // Extract account which will receive the transfer
          const toAccountId = req.body.toAccountId;
          const toAccount = accounts.find((account) => account.id === toAccountId);
          if (toAccount) {

            // Apply Withdrawal from Account
            fromAccount.balance -= convertedAmount;

            // Apply Deposit to Account
            toAccount.balance += convertedAmount;

            // Create new Withdrawal transaction
            const withdrawalTransaction = new Transaction(
              customer.id,
              fromAccount.id,
              WITHDRAWAL,
              req.body.currencyType,
              originalAmount
            );
            transactions.push(withdrawalTransaction);

            // Create new Deposit transaction
            const depositTransaction = new Transaction(
              customer.id,
              toAccount.id,
              DEPOSIT,
              req.body.currencyType,
              originalAmount
            );
            transactions.push(depositTransaction);

            // Return successful response
            res.status(200).json({
              withdrawalTransaction: withdrawalTransaction,
              depositTransaction: depositTransaction
            });

          } else {
            res.status(400).json({ message: 'Invalid Receiving Account' });
          }

        } else {
          res.status(400).json({ message: 'Insufficient Funds' });
        }

      } else {
        // Send Customer an email concerning Unauthorized Withdrawal Request
        const message = `Unauthorized Withdrawal Request on Account: "${fromAccountId}"`;
        EmailService(customer.email, message);
        res.status(400).json({ message: 'Not Authorized' });
      }

    } else {
      res.status(400).json({ message: 'Invalid Customer' });
    }

  } catch (error) {
    res.status(500).json({
      message: `Error creating transfer: "${error.message}"`,
    });
  }
};
