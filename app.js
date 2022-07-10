require('dotenv').config();
const express = require('express');

const configs = require('./config/config').configs;
const foreignExchangeRoutes = require('./api/routes/foreignExchangeRoutes');

const app = express();

app.use('/fx', foreignExchangeRoutes);

const port = configs.port || 8800;
app.listen(port, () => console.log(`Listening on port ${port}`));
