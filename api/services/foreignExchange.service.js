const moment = require('moment');

const AlphaVantageService = require('./AlphaVantage.service');
const utils = require('../utils/utils');

class ForeignExchangeService extends AlphaVantageService {
  constructor(functionName, query, params) {
    super(params);
    this.functionName = functionName;
    this.query = query
    this.fxIntradayTimeSeriesFieldsMap = Object.freeze({
      open: '1. open',
      high: '2. high',
      low: '3. low',
      close: '4. close'
    });
    this.currencyExchangeRatesFieldsMap = Object.freeze({
      fromCurrency: '1. From_Currency Code',
      fromCurrencyName: '2. From_Currency Name',
      toCurrency: '3. To_Currency Code',
      toCurrencyName: '4. To_Currency Name',
      exchangeRate: '5. Exchange Rate',
      timestamp: '6. Last Refreshed',
      timeZone: '7. Time Zone',
      bidPrice: '8. Bid Price',
      askPrice: '9. Ask Price',
    });
  }

  formatCurrencyExchangeRateValue(key, value) {
    switch (key) {
      case 'timestamp':
        return parseInt(moment.utc(value).format('X'));
      case 'exchangeRate':
      case 'bidPrice':
      case 'askPrice':
        return parseFloat(value);
      default:
        return value;
    }
  }

  initializeDataPointsMap() {
    return { open: [], high: [], low: [], close: [] }
  }

  mapRawCurrencyExchangeRateToCurrencyExchangeRateResponse() {
    const currencyExchangeRateResponse = {};
    const currencyExchangeRateRawData = this.currencyExchangeRateRawData['Realtime Currency Exchange Rate'];

    Object.keys(this.currencyExchangeRatesFieldsMap).forEach(key => {
      const value = currencyExchangeRateRawData[this.currencyExchangeRatesFieldsMap[key]];
      currencyExchangeRateResponse[key] = this.formatCurrencyExchangeRateValue(key, value);
    });
    
    return currencyExchangeRateResponse;
  }

  mapRawFXIntradayTimeSeriesPoint(timeSeriesRawData, dataPoints, datetime) {
    const timestamp = moment.utc(datetime).format('X');
    Object.keys(dataPoints).forEach(dataType => {
      dataPoints[dataType].push({ [timestamp]: parseFloat(timeSeriesRawData[datetime][this.fxIntradayTimeSeriesFieldsMap[dataType]]) });
    });
  }

  mapRawFXIntradayTimeSeriesDataToDataPoints() {
    const dataPoints = this.initializeDataPointsMap();
    const timeSeriesKey = Object.keys(this.fxIntradayTimeSeriesRawData).find(key => key.includes('Time Series FX'));
    const timeSeriesRawData = this.fxIntradayTimeSeriesRawData[timeSeriesKey];

    Object.keys(timeSeriesRawData).forEach(datetime => {
      this.mapRawFXIntradayTimeSeriesPoint(timeSeriesRawData, dataPoints, datetime);
    });

    return dataPoints;
  }

  async getCurrencyExchangeRates() {
    const functionName = 'CURRENCY_EXCHANGE_RATE';
    const url = utils.generateUrl(this.hostname, functionName, this.query, this.params);

    this.currencyExchangeRateRawData = await this.getAlphaVantageResponse(url);

    return this.mapRawCurrencyExchangeRateToCurrencyExchangeRateResponse();
  }
  
  async getFXIntradayTimeSeries() {
    const functionName = 'FX_INTRADAY';
    const url = utils.generateUrl(this.hostname, functionName, this.query, this.params);

    this.fxIntradayTimeSeriesRawData = await this.getAlphaVantageResponse(url);

    return this.mapRawFXIntradayTimeSeriesDataToDataPoints();
  }
}

module.exports = ForeignExchangeService;
