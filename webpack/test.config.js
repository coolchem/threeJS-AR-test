
let projectConfig = require("../project.config");
let webpack = require("webpack");
let CONTEXT_REPLACE_REGEX = /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/;

module.exports = function (options) {

    let testConfig = Object.assign({},require("./dev.config")(options));

    delete testConfig.entry;

    if(!options.isLocalTesting) // this means we need to instrument our test for coverage reporting
    {
        testConfig.devtool = 'inline-source-map';

        /*************************
         * Extending Rules
         **************************/

        testConfig.module.rules.push({
            test: /\.(js|tsx?)$/,
            enforce: 'post',
            loader: 'istanbul-instrumenter-loader',
            include: projectConfig.srcClientDir,
            exclude: [
                /node_modules/
            ]
        });

        testConfig.plugins.push(
            new webpack.ContextReplacementPlugin(
                // The (\\|\/) piece accounts for path separators in *nix and Windows
                CONTEXT_REPLACE_REGEX,
                projectConfig.srcDir // location of your src
            )
        );
    }

    return testConfig;
};