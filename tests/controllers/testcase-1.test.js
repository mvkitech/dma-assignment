const request = require('supertest');
const app = require('../../src/app');

test('dma_challenge_testcase_1', async () => {

  await request(app)
    .post('/api/bank/customerAccount')
    .send({
      name:  "Stewie Griffin",
      email: "Stewie.Griffin@acme.com",
      customerId: "777",
      accountId: "1234",
      balance: "100.00"
    }).expect(200);

  await request(app)
    .post('/api/bank/deposit')
    .send({
      customerId: "777",
      accountId: "1234",
      currencyType: "1",
      amount: "300.00"
    }).expect(200);

  const response = await request(app)
    .get('/api/bank/accounts/1234')
    .send()
    .expect(200);
  expect(response.body.balance).toBe(700);

});
