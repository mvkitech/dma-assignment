const request = require('supertest');
const app = require('../../src/app');
const { response } = require('../../src/app');

test('dma_challenge_testcase_3', async () => {

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

  await request(app)
    .post('/api/bank/withdrawal')
    .send({
      customerId: "201",
      accountId: "5500",
      currencyType: "0",
      amount: "5000.00"
    }).expect(200);

    await request(app)
    .post('/api/bank/transfer')
    .send({
      customerId: "201",
      fromAccountId: "1010",
      toAccountId: "5500",
      currencyType: "0",
      amount: "7300.00"
    }).expect(200);

    await request(app)
    .post('/api/bank/deposit')
    .send({
      customerId: "201",
      accountId: "1010",
      currencyType: "2",
      amount: "13726.00"
    }).expect(200);

  const response = await request(app)
    .get('/api/bank/accounts')
    .send()
    .expect(200);

  //console.log(response.body);
});