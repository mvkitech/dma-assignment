const currencyExchange = require('../../src/util/currencyExchange');
const { CAD, USD, PESO } = require('../../src/models/currencyType');

test('CurrencyExchange_whenCalledWithUSDType_ReturnsConvertedAmount', () => {
  const convertedAmount = currencyExchange(100, USD);
  expect(convertedAmount).toBe(200);
});

test('CurrencyExchange_whenCalledWithPESOType_ReturnsConvertedAmount', () => {
  const convertedAmount = currencyExchange(100, PESO);
  expect(convertedAmount).toBe(10);
});

test('CurrencyExchange_whenCalledWithCADType_ReturnsUnconvertedAmount', () => {
  const convertedAmount = currencyExchange(100, CAD);
  expect(convertedAmount).toBe(100);
});

test('CurrencyExchange_whenCalledWithUnknownType_ReturnsUnconvertedAmount', () => {
  const convertedAmount = currencyExchange(100, -1);
  expect(convertedAmount).toBe(100);
});

test('CurrencyExchange_whenCalledWithCADType_ToBeRoundedUp', () => {
  const convertedAmount = currencyExchange(100.867, CAD);
  expect(convertedAmount).toBe(100.87);
});

test('CurrencyExchange_whenCalledWithCADType_ToBeRoundedDown', () => {
  const convertedAmount = currencyExchange(100.993, CAD);
  expect(convertedAmount).toBe(100.99);
});
