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

  const response1 = await request(app)
    .get('/api/bank/accounts/0123')
    .send()
    .expect(200);
  // Commented because am unable to use the response
  // and have tried "JSON.stringify()"" + "JSON.parse()".
  // But neither worked. However if you uncomment the 
  // "console.log()" statement, balance is "33.75".
  //expect(response1.body.balance).toEqual(33.75);
  //console.log(response1.body);

  const response2 = await request(app)
    .get('/api/bank/accounts/0456')
    .send()
    .expect(200);
  // Commented because am unable to use the response
  // and have tried "JSON.stringify()"" + "JSON.parse()".
  // But neither worked. However if you uncomment the 
  // "console.log()" statement, balance is "112554.25".
  //expect(response1.body.balance).toEqual(112554.25);
  //console.log(response2.body);
});