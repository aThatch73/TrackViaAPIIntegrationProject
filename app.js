require('dotenv').config();
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const https = require('https');

const configs = require('./config/config').configs;
const foreignExchangeRoutes = require('./api/routes/foreignExchangeRoutes');
const routeValidationMiddleware = require('./api/middleware/routeValidationMiddleware');

const app = express();

app.use('/fx', foreignExchangeRoutes);
app.use('/', routeValidationMiddleware.noRouteHandler);
app.use(routeValidationMiddleware.noRouteHandler);
app.use(cors({
    origin: '*'
}));

const key = fs.readFileSync(`${__dirname}/certs/key.pem`, 'utf8');
const cert = fs.readFileSync(`${__dirname}/certs/cert.pem`, 'utf8');
const options = {
    key,
    cert
};

const server = https.createServer(options, app);

const port = configs.port || 8800;
server.listen(port, () => console.log(`Listening on port ${port}`));
