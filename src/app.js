const express = require('express');
const bankRouter = require('./routers/bank');

const app = express();

app.use(express.json());
app.use(bankRouter);

module.exports = app;
