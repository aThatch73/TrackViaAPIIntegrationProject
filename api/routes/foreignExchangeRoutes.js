/**
 * @swagger
 * components:
 *   schemas:
 *     Currency Exchange Rates:
 *       type: object
 *       example:
 *         'Realtime Currency Exchange Rate':
 *          '1. From_Currency Code': 'BTC'
 *          '2. From_Currency Name': 'Bitcoin'
 *          '3. To_Currency Code': 'USD'
 *          '4. To_Currency Name': 'United States Dollar'
 *          '5. Exchange Rate': '20047.41000000'
 *          '6. Last Refreshed': '2022-07-11 22:57:02'
 *          '7. Time Zone': 'UTC'
 *          '8. Bid Price': '20045.67000000'
 *          '9. Ask Price': '20047.41000000'
 *     FX Intraday Time Series:
 *       type: object
 *       example:
 *         'Meta Data':
 *          '1. Information': 'FX Intraday (5min) Time Series'
 *          '2. From Symbol': 'EUR'
 *          '3. To Symbol': 'USD'
 *          '4. Last Refreshed': '2022-07-11 23:25:00'
 *          '5. Interval': '5min'
 *          '6. Output Size': 'Compact'
 *          '7. Time Zone': 'UTC'
 *          'Time Series FX (5min)':
 *              '2022-07-11 23:25:00':
 *                  '1. open': '1.00460'
 *                  '2. high': '1.00466'
 *                  '3. low': '1.00430'
 *                  '4. close': '1.00430'
 *              '2022-07-11 23:20:00':
 *                  '1. open': '1.00457'
 *                  '2. high': '1.00468'
 *                  '3. low': '1.00440'
 *                  '4. close': '1.00440'
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
  * fxIntraday:
  * /av/fx/fxIntraday/{fromSymbol}/{toSymbol}/{interval}:
  *   get:
  *     summary: Gets Currency Exchange Rates for given parameters
  *     tags: [Currency Exchange Rates]
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
  *         description: The FX Intraday Time Series.
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/FX Intraday Time Series'
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

router.get('/fxIntraday/:fromSymbol/:toSymbol/:interval', async (req, res) => {
    const functionName = 'FX_INTRADAY';
    const foreignExchangeService = new ForeignExchangeService(functionName, req.params, req.query);

    try {
        const fxIntradayTimeSeriesResponse = await foreignExchangeService.getFXIntradayTimeSeries();
        res.json(fxIntradayTimeSeriesResponse);
    } catch (err) {
        logger.error(`${configs.baseErrorMessage}FX Intraday Time Series Error: ${err}`);
        res.send(`${configs.baseErrorMessage}FX Intraday Time Series Error: ${err}`);
    }
});

module.exports = router;
