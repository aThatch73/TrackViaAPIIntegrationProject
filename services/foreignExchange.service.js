const alphavantageRepo = require('../repository/alphavantage.repo');
const configs = require('../config/config').configs;

const getCurrencyExchangeRates = async function (from, to) {
  const functionName = 'CURRENCY_EXCHANGE_RATE';
  const url = `${configs.hostname}/query?function=${functionName}&from_currency=${from}&to_currency=${to}`;

  return alphavantageRepo.getAlphavantageResponse(url);
}

const getFXIntradayTimeSeries = async function (from, to, interval) {
  const functionName = 'FX_INTRADAY';
  const url = `${configs.hostname}/query?function=${functionName}&from_symbol=${from}&to_symbol=${to}&interval=${interval}`;

  return alphavantageRepo.getAlphavantageResponse(url);
}

module.exports = {
  getCurrencyExchangeRates,
  getFXIntradayTimeSeries
};
