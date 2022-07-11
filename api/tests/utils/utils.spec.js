require('mocha');
const chai = require('chai');
const exp = require('constants');

const utils = require('../../utils/utils');

const { expect } = chai;

describe('utils', () => {
    describe('generateUrl', () => {
        it('should return the generated url with parameters appended and no query parameters added if query is an empty object', () => {
            const hostname = 'hostname';
            const functionName = 'FUNCTION_NAME';
            const params = { a_param: 'a_value', b_param: 'b_value' };
            const query = {};

            const url = utils.generateUrl(hostname, functionName, params, query);

            expect(url).to.equal('hostname/query?function=FUNCTION_NAME&a_param=a_value&b_param=b_value');
        });
        
        it('should return the generated url with parameters appended and query parameters added if query is populated', () => {
            const hostname = 'hostname';
            const functionName = 'FUNCTION_NAME';
            const params = { a_param: 'a_value', b_param: 'b_value' };
            const query = { a_query_param: 'a_query_value' };

            const url = utils.generateUrl(hostname, functionName, params, query);

            expect(url).to.equal('hostname/query?function=FUNCTION_NAME&a_param=a_value&b_param=b_value&a_query_param=a_query_value');
        });
    });

    describe('appendParametersToUrl', () => {
        it('should append the parameters to the url', () => {
            const urlBase = 'url';
            const params = { a_param: 'a_value', b_param: 'b_value' }

            const url = utils.appendParametersToUrl(urlBase, params);

            expect(url).to.equal('url&a_param=a_value&b_param=b_value')
        });
    });

    describe('convertCamelCaseToSnakeCase', () => {
        it('should return the camelCased string as snake_cased string', () => {
            const paramName = 'someCamelCasedParam'

            const paramConvertedToSnakeCase = utils.convertCamelCaseToSnakeCase(paramName);

            expect(paramConvertedToSnakeCase).to.equal('some_camel_cased_param');
        });
        
        it('should return the snaked_ased string unaltered', () => {
            const paramName = 'some_camel_cased_param'

            const paramConvertedToSnakeCase = utils.convertCamelCaseToSnakeCase(paramName);

            expect(paramConvertedToSnakeCase).to.equal('some_camel_cased_param');
        });
    })
});
