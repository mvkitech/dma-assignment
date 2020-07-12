const request = require('supertest');
const app = require('../../src/app');

test('getAllAccounts_whenCalledWithoutAccounts_returnsEmptyResponse', async () => {
  
  const response = await request(app)
    .get('/api/bank/accounts')
    .send()
    .expect(200);
  expect(response.body.length).toBe(0);

});

test('getAllAccounts_whenCalledWithAccounts_returnsAccounts', async () => {

  await request(app)
    .post('/api/bank/customerAccount')
    .send({
      name:  "Joe Swanson",
      email: "Joe.Swanson@acme.com",
      customerId: "201",
      accountId: "1010",
      balance: "7425.00"
    }).expect(200);

  await request(app)
    .post('/api/bank/customerAccount')
    .send({
      name:  "Joe Swanson",
      email: "Joe.Swanson@acme.com",
      customerId: "201",
      accountId: "5500",
      balance: "15000.00"
    }).expect(200);
  
  const response = await request(app)
    .get('/api/bank/accounts')
    .send()
    .expect(200);
  expect(response.body.length).toBe(2);

});

test('getAccount_whenCalledWithInvalidAccount_returns404NotFoundResponse', async () => {

  const response = await request(app)
    .get('/api/bank/accounts/1')
    .send()
    .expect(404);
  expect(response.body.message).toBe('Not Found');

});

test('getAccount_whenCalledWithValidAccount_returnsAccount', async () => {

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
    .get('/api/bank/accounts/2001')
    .send()
    .expect(200);
  expect(response.body.balance).toBe(35000);

});
