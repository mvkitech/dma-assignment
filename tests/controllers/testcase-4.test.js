const request = require('supertest');
const app = require('../../src/app');

test('dma_challenge_testcase_4', async () => {

  await request(app)
    .post('/api/bank/customerAccount')
    .send({
      name:  "Peter Griffin",
      email: "Peter.Griffin@acme.com",
      customerId: "123",
      accountId: "0123",
      balance: "150.00"
    }).expect(200);

  await request(app)
    .post('/api/bank/customerAccount')
    .send({
      name:  "Lois Griffin",
      email: "Lois.Griffin@acme.com",
      customerId: "456",
      accountId: "0456",
      balance: "65000.00"
    }).expect(200);

  await request(app)
    .post('/api/bank/withdrawal')
    .send({
      customerId: "123",
      accountId: "0123",
      currencyType: "1",
      amount: "70.00"
    }).expect(200);

  await request(app)
    .post('/api/bank/deposit')
    .send({
      customerId: "456",
      accountId: "0456",
      currencyType: "1",
      amount: "23789.00"
    }).expect(200);

  await request(app)
    .post('/api/bank/transfer')
    .send({
      customerId: "456",
      fromAccountId: "0456",
      toAccountId: "0123",
      currencyType: "0",
      amount: "23.75"
    }).expect(200);

  let response = await request(app)
    .get('/api/bank/accounts/0123')
    .send()
    .expect(200);
  expect(response.body.balance).toBe(33.75);

  response = await request(app)
    .get('/api/bank/accounts/0456')
    .send()
    .expect(200);
  expect(response.body.balance).toEqual(112554.25);
  
});
