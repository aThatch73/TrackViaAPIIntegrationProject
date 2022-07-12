require('mocha');
const chai = require('chai');
const sinon = require('sinon');

const ForeignExchangeService = require('../../services/ForeignExchange.service');

const { expect } = chai;

describe('ForeignExchangeService', () => {
    const sandbox = sinon.createSandbox();
    const functionName = 'some function name';
    const query = 'some query';
    const params = 'some params';
    let getAlphaVantageResponseStub;

    before(() => {
        getAlphaVantageResponseStub = sandbox.stub(ForeignExchangeService.prototype, 'getAlphaVantageResponse')
    });

    after(() => {
        sandbox.restore();
    });

    describe('constructor', () => {
        it('should populate functionName', () => {
            const foreignExchangeService = new ForeignExchangeService(functionName, query, params);

            expect(foreignExchangeService.functionName).to.equal('some function name');
        });
        
        it('should populate query', () => {
            const foreignExchangeService = new ForeignExchangeService(functionName, query, params);

            expect(foreignExchangeService.query).to.equal('some query');
        });
        
        it('should populate params', () => {
            const foreignExchangeService = new ForeignExchangeService(functionName, query, params);

            expect(foreignExchangeService.params).to.equal('some params');
        });
    });

    describe('initializeFXIntradayTimeSeriesDataPoints', () => {
        it('should return intialized (empty) FX Intraday Time Series Data Points', () => {
            const foreignExchangeService = new ForeignExchangeService('some function name', 'some query', 'some params');
            
            const initializedFXIntradayTimeSeriesDataPoints = foreignExchangeService.initializeFXIntradayTimeSeriesDataPoints();

            expect(initializedFXIntradayTimeSeriesDataPoints).to.deep.equal({ open: [], high: [], low: [], close: [] });
        });
    });

    describe('mapRawCurrencyExchangeRateDataToCurrencyExchangeRateResponse', () => {
        it('should map the raw Currency Exchange Rate Data to the Currency Exchange Rate response', () => {
            const currencyExchangeRateRawData = {
                'Realtime Currency Exchange Rate': {
                    '1. From_Currency Code': 'BTC',
                    '2. From_Currency Name': 'Bitcoin',
                    '3. To_Currency Code': 'USD',
                    '4. To_Currency Name': 'United States Dollar',
                    '5. Exchange Rate': '19713.63000000',
                    '6. Last Refreshed': '2022-07-12 08:17:05',
                    '7. Time Zone': 'UTC',
                    '8. Bid Price': '19712.49000000',
                    '9. Ask Price': '19714.33000000'
                }
            };
            const foreignExchangeService = new ForeignExchangeService('some function name', 'some query', 'some params');

            const currencyExchangeRateResponse = foreignExchangeService.mapRawCurrencyExchangeRateDataToCurrencyExchangeRateResponse(currencyExchangeRateRawData);

            expect(currencyExchangeRateResponse).to.deep.equal({
                'fromCurrency': 'BTC',
                'fromCurrencyName': 'Bitcoin',
                'toCurrency': 'USD',
                'toCurrencyName': 'United States Dollar',
                'exchangeRate': 19713.63,
                'timestamp': 1657613825,
                'timeZone': 'UTC',
                'bidPrice': 19712.49,
                'askPrice': 19714.33
            });
        });
    });

    describe('mapRawFXIntradayTimeSeriesPoint', () => {
        it('should map the raw FX Intraday Time Series Data for a single point', () => {
            const fxIntradayTimeSeriesRawData = {
                '2022-07-12 08:20:00': {
                    '1. open': '1.00058',
                    '2. high': '1.00065',
                    '3. low': '1.00000',
                    '4. close': '1.00022'
                },
                '2022-07-12 08:15:00': {
                    '1. open': '1.00029',
                    '2. high': '1.00103',
                    '3. low': '1.00010',
                    '4. close': '1.00058'
                },
                '2022-07-12 08:10:00': {
                    '1. open': '1.00087',
                    '2. high': '1.00089',
                    '3. low': '1.00010',
                    '4. close': '1.00029'
                }
            };
            const dataPoints = {
                open: [],
                high: [],
                low: [],
                close: []
            };
            const datetime = '2022-07-12 08:15:00';
            const foreignExchangeService = new ForeignExchangeService('some function name', 'some query', 'some params');

            foreignExchangeService.mapRawFXIntradayTimeSeriesPoint(fxIntradayTimeSeriesRawData, dataPoints, datetime);

            expect(dataPoints).to.deep.equal({
                open: [{ "1657613700": 1.00029 }],
                high: [{ "1657613700": 1.00103 }],
                low: [{ "1657613700": 1.0001 }],
                close: [{ "1657613700": 1.00058 }]
            });
        });
    });

    describe('mapRawFXIntradayTimeSeriesDataToDataPoints', () => {
        it('should map the raw FX Intraday Time Series Data to the response data points', () => {
            const fxIntradayTimeSeriesRawData = {
                'Time Series FX (5min)': {
                    '2022-07-12 08:20:00': {
                        '1. open': '1.00058',
                        '2. high': '1.00065',
                        '3. low': '1.00000',
                        '4. close': '1.00022'
                    },
                    '2022-07-12 08:15:00': {
                        '1. open': '1.00029',
                        '2. high': '1.00103',
                        '3. low': '1.00010',
                        '4. close': '1.00058'
                    },
                    '2022-07-12 08:10:00': {
                        '1. open': '1.00087',
                        '2. high': '1.00089',
                        '3. low': '1.00010',
                        '4. close': '1.00029'
                    }
                }
            };
            const foreignExchangeService = new ForeignExchangeService('some function name', 'some query', 'some params');

            const dataPointsResponse = foreignExchangeService.mapRawFXIntradayTimeSeriesDataToDataPoints(fxIntradayTimeSeriesRawData);

            expect(dataPointsResponse).to.deep.equal({
                'open': [
                    {
                        '1657614000': 1.00058
                    },
                    {
                        '1657613700': 1.00029
                    },
                    {
                        '1657613400': 1.00087
                    }
                ],
                'high': [
                    {
                        '1657614000': 1.00065
                    },
                    {
                        '1657613700': 1.00103
                    },
                    {
                        '1657613400': 1.00089
                    }
                ],
                'low': [
                    {
                        '1657614000': 1
                    },
                    {
                        '1657613700': 1.0001
                    },
                    {
                        '1657613400': 1.0001
                    }
                ],
                'close': [
                    {
                        '1657614000': 1.00022
                    },
                    {
                        '1657613700': 1.00058
                    },
                    {
                        '1657613400': 1.00029
                    }
                ]
            })
        });
    });

    describe('getCurrencyExchangeRates', () => {
        it('should return the currency exchange rates response', async () => {
            getAlphaVantageResponseStub.returns({
                'Realtime Currency Exchange Rate': {
                    '1. From_Currency Code': 'BTC',
                    '2. From_Currency Name': 'Bitcoin',
                    '3. To_Currency Code': 'USD',
                    '4. To_Currency Name': 'United States Dollar',
                    '5. Exchange Rate': '19713.63000000',
                    '6. Last Refreshed': '2022-07-12 08:17:05',
                    '7. Time Zone': 'UTC',
                    '8. Bid Price': '19712.49000000',
                    '9. Ask Price': '19714.33000000'
                }
            });
            const foreignExchangeService = new ForeignExchangeService(functionName, query, params);

            const currencyExchangeRatesResponse = await foreignExchangeService.getCurrencyExchangeRates();
            
            expect(currencyExchangeRatesResponse).to.deep.equal({
                'fromCurrency': 'BTC',
                'fromCurrencyName': 'Bitcoin',
                'toCurrency': 'USD',
                'toCurrencyName': 'United States Dollar',
                'exchangeRate': 19713.63,
                'timestamp': 1657613825,
                'timeZone': 'UTC',
                'bidPrice': 19712.49,
                'askPrice': 19714.33
            });
        });
    });

    describe('getFXIntradayTimeSeries', () => {
        it('should return the currency exchange rates response', async () => {
            getAlphaVantageResponseStub.returns({
                'Time Series FX (5min)': {
                    '2022-07-12 08:20:00': {
                        '1. open': '1.00058',
                        '2. high': '1.00065',
                        '3. low': '1.00000',
                        '4. close': '1.00022'
                    },
                    '2022-07-12 08:15:00': {
                        '1. open': '1.00029',
                        '2. high': '1.00103',
                        '3. low': '1.00010',
                        '4. close': '1.00058'
                    },
                    '2022-07-12 08:10:00': {
                        '1. open': '1.00087',
                        '2. high': '1.00089',
                        '3. low': '1.00010',
                        '4. close': '1.00029'
                    }
                }
            });
            const foreignExchangeService = new ForeignExchangeService(functionName, query, params);

            const fxIntradayTimeSeriesResponse = await foreignExchangeService.getFXIntradayTimeSeries();
            
            expect(fxIntradayTimeSeriesResponse).to.deep.equal({
                'open': [
                    {
                        '1657614000': 1.00058
                    },
                    {
                        '1657613700': 1.00029
                    },
                    {
                        '1657613400': 1.00087
                    }
                ],
                'high': [
                    {
                        '1657614000': 1.00065
                    },
                    {
                        '1657613700': 1.00103
                    },
                    {
                        '1657613400': 1.00089
                    }
                ],
                'low': [
                    {
                        '1657614000': 1
                    },
                    {
                        '1657613700': 1.0001
                    },
                    {
                        '1657613400': 1.0001
                    }
                ],
                'close': [
                    {
                        '1657614000': 1.00022
                    },
                    {
                        '1657613700': 1.00058
                    },
                    {
                        '1657613400': 1.00029
                    }
                ]
            });
        });
    });
});
