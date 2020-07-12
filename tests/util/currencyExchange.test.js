const currencyExchange = require('../../src/util/currencyExchange');
const { CAD, USD, PESO } = require('../../src/models/currencyType');

test('currencyExchange_whenCalledWithUSDType_returnsConvertedAmount', () => {
  const convertedAmount = currencyExchange(100, USD);
  expect(convertedAmount).toBe(200);
});

test('currencyExchange_whenCalledWithPESOType_returnsConvertedAmount', () => {
  const convertedAmount = currencyExchange(100, PESO);
  expect(convertedAmount).toBe(10);
});

test('currencyExchange_whenCalledWithCADType_returnsUnconvertedAmount', () => {
  const convertedAmount = currencyExchange(100, CAD);
  expect(convertedAmount).toBe(100);
});

test('currencyExchange_whenCalledWithUnknownType_returnsUnconvertedAmount', () => {
  const convertedAmount = currencyExchange(100, -1);
  expect(convertedAmount).toBe(100);
});

test('currencyExchange_whenCalledWithCADType_returnsResultToBeRoundedUp', () => {
  const convertedAmount = currencyExchange(100.867, CAD);
  expect(convertedAmount).toBe(100.87);
});

test('currencyExchange_whenCalledWithCADType_returnsResultToBeRoundedDown', () => {
  const convertedAmount = currencyExchange(100.993, CAD);
  expect(convertedAmount).toBe(100.99);
});
