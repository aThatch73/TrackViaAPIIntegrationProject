const noRouteHandler = function (req) {
    if (!req.route) {
        throw '[Error][TrackVia - AlphaVantage Integration API]: 404 - No route'
    }
}

module.exports = {
    noRouteHandler
};
