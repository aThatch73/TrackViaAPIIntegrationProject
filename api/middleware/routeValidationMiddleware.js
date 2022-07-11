const noRouteHandler = function (req) {
    if (!req.route) {
        throw '[Error]: 404 - No route'
    }
}

module.exports = {
    noRouteHandler
};
