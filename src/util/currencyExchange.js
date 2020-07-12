const { CAD, USD, PESO } = require('../models/currencyType');

const EXCHANGE_RATE_FOR_USD = 2.0;
const EXCHANGE_RATE_FOR_PESOS = 0.1;

/**
 * Helper function used to possibly apply a currency conversion
 * on the supplied amount if it is not Canadian currency.
 */
module.exports = (amount, sourceType) => {

  let convertedAmount = parseFloat(amount);

  switch(sourceType) {
    case USD:
      convertedAmount = convertedAmount * EXCHANGE_RATE_FOR_USD;
      break;
    case PESO:
      convertedAmount = convertedAmount * EXCHANGE_RATE_FOR_PESOS;
      break
    case CAD:
    default:
      break;        
  }

  return roundOff(convertedAmount, 2);
};

/**
 * Helper function used to round to specified number of decimal places.
 */
let roundOff = (number, places) => {
  const x = Math.pow(10, places);
  return Math.round(number * x) / x;
}
