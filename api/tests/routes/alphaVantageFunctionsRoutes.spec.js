require('mocha');
const chai = require('chai');

const alphaVantageFunctionsRoutes = require('../../routes/alphaVantageFunctionsRoutes');

const { expect } = chai;

describe('alphaVantageFunctionsRoutes', () => {
    describe('routes exist', () => {
        describe('/functions', () => {
            it('should have route /functions', () => {
                expect(alphaVantageFunctionsRoutes.stack.some((s) => s.route.path === '/functions')).to.equal(true);
            });
            
            it('should have a GET method on route /functions', () => {
                expect(alphaVantageFunctionsRoutes.stack.some((s) => Object.keys(s.route.methods).includes('get'))).to.equal(true)
            });
        });
    });
});
