require('mocha');
const chai = require('chai');

const foreignExchangeRoutes = require('../../routes/foreignExchangeRoutes');

const { expect } = chai;

describe('foreignExchangeRoutes', () => {
    describe('routes exist', () => {
        describe('/currencyExchangeRates/:fromCurrency/:toCurrency', () => {
            it('should have route /currencyExchangeRates/:fromCurrency/:toCurrency', () => {
                expect(foreignExchangeRoutes.stack.some((s) => s.route.path === '/currencyExchangeRates/:fromCurrency/:toCurrency')).to.equal(true);
            });
            
            it('should have a GET method on route /currencyExchangeRates/:fromCurrency/:toCurrency', () => {
                expect(foreignExchangeRoutes.stack.some((s) => Object.keys(s.route.methods).includes('get'))).to.equal(true)
            });
        });
        
        describe('/fxIntraday/:fromSymbol/:toSymbol/:interval', () => {
            it('should have route /fxIntraday/:fromSymbol/:toSymbol/:interval', () => {
                expect(foreignExchangeRoutes.stack.some((s) => s.route.path === '/fxIntraday/:fromSymbol/:toSymbol/:interval')).to.equal(true);
            });
            
            it('should have a GET method on route /fxIntraday/:fromSymbol/:toSymbol/:interval', () => {
                expect(foreignExchangeRoutes.stack.some((s) => Object.keys(s.route.methods).includes('get'))).to.equal(true)
            });
        });
    });
});
