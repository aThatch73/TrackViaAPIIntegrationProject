const express = require('express');
const router = express.Router();

const ForeignExchangeService = require('../services/foreignExchange.service');

router.get('/currencyExchangeRates/:fromCurrency/:toCurrency', async (req, res) => {
    const functionName = 'CURRENCY_EXCHANGE_RATE';
    const foreignExchangeService = new ForeignExchangeService(functionName, req.params, req.query);

    try {
        const currencyExchangeRatesResponse = await foreignExchangeService.getCurrencyExchangeRates();
        res.json(currencyExchangeRatesResponse);
    } catch (err) {
        console.error(`[Error]: ${err}`);
        res.send(`[Error]: ${err}`);
    }
});

router.get('/fxIntraday/:fromSymbol/:toSymbol/:interval', async (req, res) => {
    const functionName = 'FX_INTRADAY';
    const foreignExchangeService = new ForeignExchangeService(functionName, req.params, req.query);

    try {
        const fxIntradayTimeSeriesResponse = await foreignExchangeService.getFXIntradayTimeSeries();
        res.json(fxIntradayTimeSeriesResponse);
    } catch (err) {
        console.error(`[Error]: ${err}`);
        res.send(`[Error]: ${err}`);
    }
});

module.exports = router;
