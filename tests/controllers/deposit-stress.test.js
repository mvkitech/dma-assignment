const request = require('supertest');
const app = require('../../src/app');

test('addDeposit_whenInvalidCustomerUsed_returns400InvalidCustomerResponse', async () => {

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
    .post('/api/bank/deposit')
    .send({
      customerId: "201",
      accountId: "1234",
      currencyType: "0",
      amount: "300.00"
    }).expect(400);
  expect(response.body.message).toBe('Invalid Customer');

});

test('addDeposit_whenCustomerNotAuthorized_returns400NotAuthorizedResponse', async () => {

  await request(app)
    .post('/api/bank/customerAccount')
    .send({
      name:  "Joe Swanson",
      email: "Joe.Swanson@acme.com",
      customerId: "201",
      accountId: "1010",
      balance: "7425.00"
    }).expect(200);

  const response =await request(app)
    .post('/api/bank/deposit')
    .send({
      customerId: "201",
      accountId: "1234",
      currencyType: "0",
      amount: "300.00"
    }).expect(400);
  expect(response.body.message).toBe('Not Authorized');

});