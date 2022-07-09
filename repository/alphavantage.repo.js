const request = require('request');
const configs = require('../config/config').configs;

const getAlphavantageResponse = async function (url) {
    return new Promise((resolve, reject) => {
        request.get({
            url: `${url}&apikey=${configs.apikey}`,
            json: true,
            headers: {'User-Agent': 'request'}
          }, (err, res) => {
            if (err) {
                console.error('Error:', err);
                reject(err);
            } 
            if (res.statusCode !== 200) {
                reject(res.statusCode);
            }
            resolve(res.body);
        });
    });
}

module.exports = {
    getAlphavantageResponse
};
