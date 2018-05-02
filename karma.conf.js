

let reporters = [,'mocha','kjhtml'];
let webpackConfig;
let isLocalTesting = true;

if(process.env.NODE_ENV === "test" || process.env.NODE_ENV === "testing") // this means it is not a local test environment
{
    reporters = reporters.concat(['coverage','remap-coverage']);
    isLocalTesting = false;
}

webpackConfig = require("./webpack/test.config")({env:"test", isLocalTesting:isLocalTesting})

module.exports = function(config) {
    config.set({
        basePath: '',
        autoWatch: true,
        autoWatchBatchDelay:300,

        singleRun: false,
        frameworks: ['jasmine'],

        files:[
            {pattern: 'node_modules/core-js/client/shim.min.js', included:true, watched: false},
            {pattern: './karma-test-shim.js', watched: false}],

        reporters: reporters,
        preprocessors: {
            './karma-test-shim.js': ['coverage','webpack','sourcemap']
        },

        webpack: webpackConfig,

        coverageReporter: {
            type: 'in-memory'
        },

        remapCoverageReporter: {
            'text-summary': null,
            lcovonly:"./coverage/lcov.info",
            html: './coverage/html',
            cobertura: './coverage/cobertura/cobertura-coverage.xml'
        }
    });
};