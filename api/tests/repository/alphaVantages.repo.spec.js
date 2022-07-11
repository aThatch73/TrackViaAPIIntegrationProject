require('mocha');
const chai = require('chai');
const sinon = require('sinon');

const request = require('request');

const AlphaVantageRepo = require('../../repository/alphaVantage.repo');

const { expect } = chai;

describe('AlphaVantageRepo', () => {
    const sandbox = sinon.createSandbox();
    let requestGetStub;

    beforeEach(() => {
        requestGetStub = sandbox.stub(request, 'get');
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('constructor', () => {
        it('should populate apikey', () => {
            const alphaVantageRepo = new AlphaVantageRepo();

            expect(alphaVantageRepo.apikey).to.equal('<default_api_key>');
        });
    });

    describe('getAlphaVantageResponse', () => {
        it('should return null err if no error returns', async () => {
            requestGetStub.yields(null, 'some response');
            const alphaVantageRepo = new AlphaVantageRepo();
            const url = 'some url';

            alphaVantageRepo.getAlphaVantageResponse(url, (err, res) => {
                expect(err).to.equal(null);
            });
        });
        
        it('should return response if no error returns', async () => {
            requestGetStub.yields(null, 'some response');
            const alphaVantageRepo = new AlphaVantageRepo();
            const url = 'some url';

            alphaVantageRepo.getAlphaVantageResponse(url, (err, res) => {
                expect(res).to.equal('some response');
            });
        });
        
        it('should return err if error returns', async () => {
            requestGetStub.yields('some error',  null);
            const alphaVantageRepo = new AlphaVantageRepo();
            const url = 'some url';

            alphaVantageRepo.getAlphaVantageResponse(url, (err, res) => {
                expect(err).to.equal('some error');
            });
        });
        
        it('should return null response if error returns', async () => {
            requestGetStub.yields('some error',  null);
            const alphaVantageRepo = new AlphaVantageRepo();
            const url = 'some url';

            alphaVantageRepo.getAlphaVantageResponse(url, (err, res) => {
                expect(res).to.deep.equal(null);
            });
        });
    });

    describe('getAlphaVantageResponseAsync', () => {
        it('should return the request.get response body if no error returns and statusCode is 200', async () => {
            requestGetStub.yields(null, { statusCode: 200, body: 'some request.get data' });
            const alphaVantageRepo = new AlphaVantageRepo();
            const url = 'some url';

            const currencyExchangeRatesResponse = await alphaVantageRepo.getAlphaVantageResponseAsync(url);
            
            expect(currencyExchangeRatesResponse).to.equal('some request.get data');
        });
        
        it('should return the request.get response statusCode if no error returns and statusCode is NOT 200', async () => {
            requestGetStub.yields('some error', null);
            const alphaVantageRepo = new AlphaVantageRepo();
            const url = 'some url';

            try {
                await alphaVantageRepo.getAlphaVantageResponseAsync(url);
            } catch (err) {
                expect(err).to.equal('some error');
            }
        });
        
        it('should return the request.get response statusCode if no error returns and statusCode is NOT 200', async () => {
            requestGetStub.yields(null, { statusCode: 404, body: null });
            const alphaVantageRepo = new AlphaVantageRepo();
            const url = 'some url';

            try {
                await alphaVantageRepo.getAlphaVantageResponseAsync(url);
            } catch (err) {
                expect(err).to.equal(404);
            }
        });
    });
});
