const generateUrl = function (hostname, functionName, parameters) {
    let url = `${hostname}/query?function=${functionName}`;

    Object.keys(parameters).filter(param => !!parameters[param]).forEach(param => {
      url = `${url}&${param}=${parameters[param]}`
    });

    return url;
};

const satisfiesMinimumRequiredQueryParameters = function (requiredQueryParams, suppliedQueryParams) {
    if (requiredQueryParams.every(q => Object.keys(suppliedQueryParams).includes(q))) {
        return true;
    }
    return false;
};

module.exports = {
    generateUrl,
    satisfiesMinimumRequiredQueryParameters
}
