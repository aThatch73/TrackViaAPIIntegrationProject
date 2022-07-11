require('dotenv').config();
const express = require('express');
const fs = require('fs');
const https = require('https');
const logger = require('loglevel');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const configs = require('./config/config').configs;
const alphaVantageFunctionsRoutes = require('./api/routes/alphaVantageFunctionsRoutes');
const foreignExchangeRoutes = require('./api/routes/foreignExchangeRoutes');
const corsMiddleware = require('./api/middleware/corsMiddleware');
const routeValidationMiddleware = require('./api/middleware/routeValidationMiddleware');
const swaggerOptions = require('./swagger/config').options;
const swaggerSpecs = swaggerJsDoc(swaggerOptions);

logger.setLevel(configs.logLevel);

logger.info('[TrackVia - AlphaVantage Integration API]: Starting Server...');

const app = express();

logger.info('[TrackVia - AlphaVantage Integration API]: Loading Routes...');

app.use(corsMiddleware.corsHandler);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));
app.use('/av/fx', foreignExchangeRoutes);
app.use('/av', alphaVantageFunctionsRoutes);
app.use('/', routeValidationMiddleware.noRouteHandler);
app.use(routeValidationMiddleware.noRouteHandler);

const server = https.createServer({
    key: fs.readFileSync(`${__dirname}${configs.keyPath}`),
    cert: fs.readFileSync(`${__dirname}${configs.certPath}`),
}, app);

const port = configs.port || 8800;
server.listen(port, () => {
    logger.info(`[TrackVia - AlphaVantage Integration API]: Server Ready - Listening on port ${port}`)
});
