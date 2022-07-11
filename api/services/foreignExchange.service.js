const AlphaVantageService = require('./alphaVantage.service');
const utils = require('../utils/utils');

class ForeignExchangeService extends AlphaVantageService {
  constructor(functionName, query, params) {
    super(params);
    this.functionName = functionName;
    this.query = query
  }

  async getCurrencyExchangeRates() {
    const functionName = 'CURRENCY_EXCHANGE_RATE';
    const url = utils.generateUrl(this.hostname, functionName, this.query, this.params);

    return this.getAlphaVantageResponse(url);
  }
  
  async getFXIntradayTimeSeries() {
    const functionName = 'FX_INTRADAY';
    const url = utils.generateUrl(this.hostname, functionName, this.query, this.params);

    return this.getAlphaVantageResponse(url);
  }
}

module.exports = ForeignExchangeService;
