const generateUrl = function (hostname, functionName, params, query) {
    const urlBase = `${hostname}/query?function=${functionName}`;
    const url = appendParametersToUrl(urlBase, params);

    return appendParametersToUrl(url, query);
};

const appendParametersToUrl = function (url, params) {
    Object.keys(params).filter(p => !!params[p]).forEach(p => {
        url = `${url}&${convertCamelCaseToSnakeCase(p)}=${params[p]}`
    });

    return url;
}

const convertCamelCaseToSnakeCase = function (paramName) {
    return paramName.replace(/[A-Z]/g, char => `_${char.toLowerCase()}`);
}

module.exports = {
    generateUrl,
    appendParametersToUrl,
    convertCamelCaseToSnakeCase
}
