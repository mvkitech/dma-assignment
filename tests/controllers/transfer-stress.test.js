const request = require('supertest');
const app = require('../../src/app');

test('addTransfer_whenInvalidCustomerUsed_returns400InvalidCustomerResponse', async () => {

  await request(app)
    .post('/api/bank/customerAccount')
    .send({
      name:  "Lois Griffin",
      email: "Lois.Griffin@acme.com",
      customerId: "456",
      accountId: "0456",
      balance: "65000.00"
    }).expect(200);

  const response = await request(app)
    .post('/api/bank/transfer')
    .send({
      customerId: "201",
      fromAccountId: "0456",
      toAccountId: "0123",
      currencyType: "1",
      amount: "300.00"
    }).expect(400);
  expect(response.body.message).toBe('Invalid Customer');

});

test('addTransfer_whenCustomerNotAuthorized_returns400NotAuthorizedResponse', async () => {

  await request(app)
    .post('/api/bank/customerAccount')
    .send({
      name:  "Joe Swanson",
      email: "Joe.Swanson@acme.com",
      customerId: "201",
      accountId: "1010",
      balance: "7425.00"
    }).expect(200);

  const response = await request(app)
    .post('/api/bank/transfer')
    .send({
      customerId: "201",
      fromAccountId: "0456",
      toAccountId: "0123",
      currencyType: "0",
      amount: "300.00"
    }).expect(400);
  expect(response.body.message).toBe('Not Authorized');

});

test('addTransfer_whenInsufficientFundsUsed_returns400InsufficientFundsResponse', async () => {

  await request(app)
    .post('/api/bank/customerAccount')
    .send({
      name:  "Stewie Griffin",
      email: "Stewie.Griffin@acme.com",
      customerId: "777",
      accountId: "1234",
      balance: "100.00"
    }).expect(200);

  const response = await request(app)
    .post('/api/bank/transfer')
    .send({
      customerId: "777",
      fromAccountId: "1234",
      toAccountId: "0123",
      currencyType: "0",
      amount: "200.00"
    }).expect(400);
  expect(response.body.message).toBe('Insufficient Funds');

});

test('addTransfer_whenInvalidReceivingAccountUsed_returns400InvalidReceivingAccountResponse', async () => {

  await request(app)
    .post('/api/bank/customerAccount')
    .send({
      name:  "Glenn Quagmire",
      email: "Glenn.Quagmire@acme.com",
      customerId: "504",
      accountId: "2001",
      balance: "35000.00"
    }).expect(200);

    const response = await request(app)
    .post('/api/bank/transfer')
    .send({
      customerId: "504",
      fromAccountId: "2001",
      toAccountId: "1138",
      currencyType: "0",
      amount: "200.00"
    }).expect(400);
  expect(response.body.message).toBe('Invalid Receiving Account');

});
