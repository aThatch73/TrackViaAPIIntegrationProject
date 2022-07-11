const request = require('request');
const configs = require('../../config/config').configs;

class AlphaVantageRepo {
    constructor() {
        this.apikey = configs.apikey;
    }

    getAlphaVantageResponse(url, callback) {
        request.get({
            url: `${url}&apikey=${this.apikey}`,
            json: true,
            headers: {'User-Agent': 'request'}
          }, (err, res) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, res);
            }
        });
    }

    async getAlphaVantageResponseAsync(url) {
        return new Promise((resolve, reject) => {
            this.getAlphaVantageResponse(url, (err, res) => {
                if (err) {
                    reject(err);
                }
                if (res.statusCode !== 200) {
                    reject(res.statusCode);
                }
                resolve(res.body);
            });
        }).catch(err => {
            throw err;
        });
    }
}

module.exports = AlphaVantageRepo;
