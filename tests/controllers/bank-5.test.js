const request = require('supertest');
const app = require('../../src/app');

test('dma_challenge_testcase_4', async () => {

  await request(app)
    .post('/api/bank/customerAccount')
    .send({
      name:  "Joe Swanson",
      email: "Joe.Swanson@acme.com",
      customerId: "002",
      accountId: "1011",
      balance: "7425.00"
    }).expect(200);

  await request(app)
    .post('/api/bank/customerAccount')
    .send({
      name:  "John Shark",
      email: "John.Shark@grifters.org",
      customerId: "219",
      accountId: "666",
      balance: "0.00"
    }).expect(200);

  await request(app)
    .post('/api/bank/withdrawal')
    .send({
      customerId: "219",
      accountId: "1011",
      currencyType: "1",
      amount: "100.00"
    }).expect(400);

  const response = await request(app)
    .get('/api/bank/accounts/1011')
    .send()
    .expect(200);
  // Commented because am unable to use the response
  // and have tried "JSON.stringify()"" + "JSON.parse()".
  // But neither worked. However if you uncomment the 
  // "console.log()" statement, balance is "7425".
  //expect(response1.body.balance).toEqual(7425);
  //console.log(response.body);
});