require('mocha');
const chai = require('chai');

const routeValidationMiddleware = require('../../middleware/routeValidationMiddleware');

const { expect } = chai;

describe('routeValidationMiddleware', () => {
    describe('noRouteHandler', () => {
        it('should do nothing if a route exists on req', () => {
            const req = { route: 'some route' };
            const result = routeValidationMiddleware.noRouteHandler(req);
    
            expect(result).to.equal(undefined);
        });
        
        it('should throw an error if a route does not exist on req', () => {
            const req = {};

            try {
                routeValidationMiddleware.noRouteHandler(req);
            } catch (err) {
                expect(err).to.equal('[Error]: 404 - No route');
            }
        });
    });
});
