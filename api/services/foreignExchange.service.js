const AlphaVantageService = require('./alphaVantage.service');
const utils = require('../utils/utils');

class ForeignExchangeService extends AlphaVantageService {
  constructor(functionName, params) {
    super(params);
    this.functionName = functionName;
    this.requiredQueryParamsMap = {
      'CURRENCY_EXCHANGE_RATE': ['from_currency', 'to_currency'],
      'FX_INTRADAY': ['from_symbol', 'to_symbol', 'interval'],
    };
    this.requiredQueryParams = this.requiredQueryParamsMap[this.functionName];
  }

  async getCurrencyExchangeRates() {
    const functionName = 'CURRENCY_EXCHANGE_RATE';
    const url = utils.generateUrl(this.hostname, functionName, this.params);

    return this.getAlphaVantageResponse(url);
  }
  
  async getFXIntradayTimeSeries() {
    const functionName = 'FX_INTRADAY';
    const url = utils.generateUrl(this.hostname, functionName, this.params);

    return this.getAlphaVantageResponse(url);
  }
}

module.exports = ForeignExchangeService;
