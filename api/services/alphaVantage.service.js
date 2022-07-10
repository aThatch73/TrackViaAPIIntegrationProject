const AlphaVantageRepo = require('../repository/alphaVantage.repo');
const configs = require('../../config/config').configs;

class AlphaVantageService {
  constructor(params) {
    this.alphaVantageRepo = new AlphaVantageRepo();
    this.hostname = configs.hostname;
    this.params = params;
  }

  async getAlphaVantageResponse(url) {
    try {
      return this.alphaVantageRepo.getAlphaVantageResponseAsync(url);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = AlphaVantageService;
