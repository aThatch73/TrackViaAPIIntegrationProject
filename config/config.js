const configs = {
    hostname: process.env.HOSTNAME || '<default_hostname>',
    apikey: process.env.API_KEY || '<default_api_key>',
    port: process.env.PORT || 3000,
    keyPath: process.env.KEY_PATH,
    certPath: process.env.CERT_PATH,
    logLevel: process.env.LOG_LEVEL || 'debug',
    baseErrorMessage: '[Error][TrackVia - AlphaVantage Integration API]: ',
    functions: [
        'CURRENCY_EXCHANGE_RATE',
        'FX_INTRADAY',
    ],
};

module.exports = {
    configs
}
