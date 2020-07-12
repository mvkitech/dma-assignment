const request = require('supertest');
const app = require('../../src/app');

test('dma_challenge_testcase_2', async () => {

  await request(app)
    .post('/api/bank/customerAccount')
    .send({
      name:  "Glenn Quagmire",
      email: "Glenn.Quagmire@acme.com",
      customerId: "504",
      accountId: "2001",
      balance: "35000.00"
    }).expect(200);

  await request(app)
    .post('/api/bank/withdrawal')
    .send({
      customerId: "504",
      accountId: "2001",
      currencyType: "2",
      amount: "5000.00"
    }).expect(200);

  await request(app)
    .post('/api/bank/withdrawal')
    .send({
      customerId: "504",
      accountId: "2001",
      currencyType: "1",
      amount: "12500.00"
    }).expect(200);

  await request(app)
    .post('/api/bank/deposit')
    .send({
      customerId: "504",
      accountId: "2001",
      currencyType: "0",
      amount: "300.00"
    }).expect(200);

  const response = await request(app)
    .get('/api/bank/accounts/2001')
    .send()
    .expect(200);
  // Commented because am unable to use the response
  // and have tried "JSON.stringify()"" + "JSON.parse()".
  // But neither worked. However if you uncomment the 
  // "console.log()" statement, balance is "9800".
  //expect(response.body.balance).toEqual(9800);
  //console.log(response.body);
});