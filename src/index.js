const app  = require('./app');
const port = process.env.PORT;

app.listen(port, () => {
  console.log('dma-challenge is running on port: ' + port);
});
