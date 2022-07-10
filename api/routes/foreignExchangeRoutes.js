const express = require('express');
const router = express.Router();

const utils = require('../utils/utils');
const ForeignExchangeService = require('../services/foreignExchange.service');

router.get('/currencyExchangeRates', async (req, res) => {
    const functionName = 'CURRENCY_EXCHANGE_RATE';
    const foreignExchangeService = new ForeignExchangeService(functionName, req.query);

    if (!utils.satisfiesMinimumRequiredQueryParameters(foreignExchangeService.requiredQueryParams, req.query)) {
        return res.send(`[Error]: Request missing one of the following query parameters: [${foreignExchangeService.requiredQueryParams.join(', ')}]`);
    }

    try {
        const currencyExchangeRatesResponse = await foreignExchangeService.getCurrencyExchangeRates();
        res.json(currencyExchangeRatesResponse);
    } catch (err) {
        console.error(`[Error]: ${err}`);
        res.send(`[Error]: ${err}`);
    }
});

router.get('/fxIntraday', async (req, res) => {
    const functionName = 'FX_INTRADAY';
    const foreignExchangeService = new ForeignExchangeService(functionName, req.query);

    if (!utils.satisfiesMinimumRequiredQueryParameters(foreignExchangeService.requiredQueryParams, req.query)) {
        return res.send(`[Error]: Request missing one of the following query parameters: [${foreignExchangeService.requiredQueryParams.join(', ')}]`);
    }

    try {
        const currencyExchangeRatesResponse = await foreignExchangeService.getFXIntradayTimeSeries();
        res.json(currencyExchangeRatesResponse);
    } catch (err) {
        console.error(`[Error]: ${err}`);
        res.send(`[Error]: ${err}`);
    }
});

module.exports = router;
