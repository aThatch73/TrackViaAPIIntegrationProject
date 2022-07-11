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

    describe('getCurrencyExchangeRates', () => {
        it('should return the currency exchange rates response', async () => {
            getAlphaVantageResponseStub.returns('some currency exchange rates data');
            const foreignExchangeService = new ForeignExchangeService(functionName, query, params);

            const currencyExchangeRatesResponse = await foreignExchangeService.getCurrencyExchangeRates();
            
            expect(currencyExchangeRatesResponse).to.equal('some currency exchange rates data');
        });
    });

    describe('getFXIntradayTimeSeries', () => {
        it('should return the currency exchange rates response', async () => {
            getAlphaVantageResponseStub.returns('some fx intraday time series data');
            const foreignExchangeService = new ForeignExchangeService(functionName, query, params);

            const fxIntradayTimeSeriesResponse = await foreignExchangeService.getFXIntradayTimeSeries();
            
            expect(fxIntradayTimeSeriesResponse).to.equal('some fx intraday time series data');
        });
    });
});
