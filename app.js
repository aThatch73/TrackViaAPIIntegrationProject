require('dotenv').config();
const express = require('express');

const configs = require('./config/config').configs;
const foreignExchangeRoutes = require('./api/routes/foreignExchangeRoutes');
const routeValidationMiddleware = require('./api/middleware/routeValidationMiddleware');

const app = express();

app.use('/fx', foreignExchangeRoutes);
app.use('/', routeValidationMiddleware.noRouteHandler);
app.use(routeValidationMiddleware.noRouteHandler);

const port = configs.port || 8800;
app.listen(port, () => console.log(`Listening on port ${port}`));
