require('mocha');
const chai = require('chai');
const sinon = require('sinon');

const AlphaVantageRepo = require('../../repository/alphaVantage.repo');
const AlphaVantageService = require('../../services/alphaVantage.service');

const { expect } = chai;

describe('AlphaVantageService', () => {
    const sandbox = sinon.createSandbox();
    let getAlphaVantageResponseAsyncStub;

    before(() => {
        getAlphaVantageResponseAsyncStub = sandbox.stub(AlphaVantageRepo.prototype, 'getAlphaVantageResponseAsync')
    });

    after(() => {
        sandbox.restore();
    });

    describe('constructor', () => {
        it('should populate params', () => {
            const params = 'some params';
            const alphaVantageService = new AlphaVantageService(params);

            expect(alphaVantageService.params).to.equal('some params');
        });
        
        it('should populate hostname', () => {
            const params = 'some params';
            const alphaVantageService = new AlphaVantageService(params);

            expect(alphaVantageService.hostname).to.equal('<default_hostname>');
        });
    });

    describe('getAlphaVantageResponse', () => {
        it('should return the data response from the alphaVantageRepo', async () => {
            getAlphaVantageResponseAsyncStub.returns('some data');
            const params = 'some params';
            const alphaVantageService = new AlphaVantageService(params);
            const url = 'some url';

            const alphaVantageResponse = await alphaVantageService.getAlphaVantageResponse(url);
            
            expect(alphaVantageResponse).to.equal('some data');
        });
    });
});
