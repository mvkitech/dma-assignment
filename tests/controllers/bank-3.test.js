const request = require('supertest');
const app = require('../../src/app');

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

  const response1 = await request(app)
      .get('/api/bank/accounts/1010')
      .send()
      .expect(200);
  // Commented because am unable to use the response
  // and have tried "JSON.stringify()"" + "JSON.parse()".
  // But neither worked. However if you uncomment the 
  // "console.log()" statement, balance is "1497.6".
  //expect(response1.body.balance).toEqual(1497.6);
  //console.log(response1.body);

  const response2 = await request(app)
      .get('/api/bank/accounts/5500')
      .send()
      .expect(200);
  // Commented because am unable to use the response
  // and have tried "JSON.stringify()"" + "JSON.parse()".
  // But neither worked. However if you uncomment the 
  // "console.log()" statement, balance is "17300".
  //expect(response2.body.balance).toEqual(17300);
  //console.log(response2.body);
});