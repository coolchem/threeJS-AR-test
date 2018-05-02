const projectConfig = require("./project.config");

let envObject = {env: process.env.NODE_ENV};

switch (process.env.NODE_ENV) {

    case projectConfig.Environments.PRODUCTION:
        module.exports = require('./webpack/prod.config')(envObject);
        break;
    case projectConfig.Environments.TEST:
        module.exports = require('./webpack/test.config')(envObject);
        break;
    case projectConfig.Environments.DEVELOPMENT:
    default:
        module.exports = require('./webpack/dev.config')(envObject);
}