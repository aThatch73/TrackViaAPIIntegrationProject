/**
 * @swagger
 * components:
 *   schemas:
 *     Currency Exchange Rates:
 *       type: object
 *       example:
 *          'fromCurrency': 'BTC'
 *          'fromCurrencyName': 'Bitcoin'
 *          'toCurrency': 'USD'
 *          'toCurrencyName': 'United States Dollar'
 *          'exchangeRate': 20047.41
 *          'timestamp': 1657611000
 *          'timeZone': 'UTC'
 *          'bidPrice': 20045.67
 *          'askPrice': 20047.41
 *     FX Intraday Time Series Data Points:
 *       type: object
 *       example:
 *         'open':
 *          - '1657611000': 1.00112
 *          - '1657610700': 1.00072
 *          - '1657610400': 1.00111
 *          - '1657610100': 1.00158
 *         'high':
 *          - '1657611000': 1.00151
 *          - '1657610700': 1.00133
 *          - '1657610400': 1.00145
 *          - '1657610100': 1.00173
 *         'low':
 *          - '1657611000': 1.00050
 *          - '1657610700': 1.00050
 *          - '1657610400': 1.00030
 *          - '1657610100': 1.00030
 *         'close':
 *          - '1657611000': 1.00094
 *          - '1657610700': 1.00114
 *          - '1657610400': 1.00076
 *          - '1657610100': 1.00110
 */

 /**
  * @swagger
  * currencyExchangeRates:
  * /av/fx/currencyExchangeRates/{fromCurrency}/{toCurrency}:
  *   get:
  *     summary: Gets Currency Exchange Rates for given parameters
  *     tags: [Currency Exchange Rates]
  *     parameters:
  *         - in: path
  *           name: fromCurrency
  *           type: string
  *           required: true 
  *           description: the currency type from which to convert
  *         - in: path
  *           name: toCurrency
  *           type: string
  *           required: true 
  *           description: the currency type to which to convert
  *     responses:
  *       200:
  *         description: The Currency Exchange Rates.
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Currency Exchange Rates'
  * fxIntradayTimeSeriesDataPoints:
  * /av/fx/fxIntradayTimeSeriesDataPoints/{fromSymbol}/{toSymbol}/{interval}:
  *   get:
  *     summary: Gets FX Intraday Time Series Data Points for given parameters
  *     tags: [FX Intraday Time Series Data Points]
  *     parameters:
  *         - in: path
  *           name: fromSymbol
  *           type: string
  *           required: true 
  *           description: the currency type from which to build the time series
  *         - in: path
  *           name: toSymbol
  *           type: string
  *           required: true 
  *           description: the currency type to which to build the time series
  *         - in: path
  *           name: interval
  *           type: string
  *           required: true 
  *           description: the interval on which to build the time series
  *     responses:
  *       200:
  *         description: The FX Intraday Time Series Data Points.
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/FX Intraday Time Series Data Points'
 */
 
const express = require('express');
const logger = require('loglevel');
const router = express.Router();

const configs = require('../../config/config').configs;
const ForeignExchangeService = require('../services/ForeignExchange.service');

router.get('/currencyExchangeRates/:fromCurrency/:toCurrency', async (req, res) => {
    const functionName = 'CURRENCY_EXCHANGE_RATE';
    const foreignExchangeService = new ForeignExchangeService(functionName, req.params, req.query);

    try {
        const currencyExchangeRatesResponse = await foreignExchangeService.getCurrencyExchangeRates();
        res.json(currencyExchangeRatesResponse);
    } catch (err) {
        logger.error(`${configs.baseErrorMessage}Currency Exchange Rates Error: ${err}`);
        res.send(`${configs.baseErrorMessage}Currency Exchange Rates Error: ${err}`);
    }
});

router.get('/fxIntradayTimeSeriesDataPoints/:fromSymbol/:toSymbol/:interval', async (req, res) => {
    const functionName = 'FX_INTRADAY';
    const foreignExchangeService = new ForeignExchangeService(functionName, req.params, req.query);

    try {
        const fxIntradayTimeSeriesResponse = await foreignExchangeService.getFXIntradayTimeSeries();
        res.json(fxIntradayTimeSeriesResponse);
    } catch (err) {
        logger.error(`${configs.baseErrorMessage}FX Intraday Time Series Data Points Error: ${err}`);
        res.send(`${configs.baseErrorMessage}FX Intraday Time Series Data Points Error: ${err}`);
    }
});

module.exports = router;
