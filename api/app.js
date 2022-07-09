require('dotenv').config();
console.log(process.env);
const express = require('express');
const configs = require('../config/config').configs;
const foreignExchangeService = require('../services/foreignExchange.service');

const app = express();

app.get('/currencyExchangeRates/:from/:to', async (req, res) => {
    const currencyExchangeRatesResponse = await foreignExchangeService.getCurrencyExchangeRates(req.params.from, req.params.to);

    res.json(currencyExchangeRatesResponse);
});

app.get('/fxIntraday/:from/:to/:interval', async (req, res) => {
    const currencyExchangeRatesResponse = await foreignExchangeService.getFXIntradayTimeSeries(req.params.from, req.params.to, req.params.interval);

    res.json(currencyExchangeRatesResponse);
});

const port = configs.port || 8800;
app.listen(port, () => console.log(`Listening on port ${port}`));
