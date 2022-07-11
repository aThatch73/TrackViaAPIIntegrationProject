const configs = require('../config/config').configs;

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'TrackVia AlphaVantage Integrated API',
        version: '1.0.0',
        description: 'TrackVia AlphaVantage Integrated API',
        contact: {
          name: 'API Support',
          email: 'aaron.thatcher11@gmail.com',
        },
      },
  
      servers: [
        {
          url: `https://localhost:${configs.port}`,
          description: 'TrackVia AlphaVantage Integrated API Documentation',
        },
      ],
    },
    apis: ['./api/routes/*.js'],
  };

  module.exports = {
    options
  };
