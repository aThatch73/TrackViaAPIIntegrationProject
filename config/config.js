const configs = {
    hostname: process.env.HOSTNAME || '<default_hostname>',
    apikey: process.env.API_KEY || '<default_api_key>',
    port: process.env.PORT || 8800,
};

module.exports = {
    configs
}
