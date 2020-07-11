const app = require('./app');
const port = 3000; //process.env.PORT;

app.listen(port, () => {
  console.log('dma-challenge is running on port: ' + port);
});
