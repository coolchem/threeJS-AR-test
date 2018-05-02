
let webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let projectConfig = require("../project.config");

module.exports = function (options) {

    let prodConfig = Object.assign({},require("./common.config")(options));

    /*************************
     * Extending Plugins
     **************************/

    prodConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin('common'));

    prodConfig.plugins.push(new ExtractTextPlugin(projectConfig.distClientDirMainCSS));
    prodConfig.plugins.push(new CopyWebpackPlugin([
        {
            context:projectConfig.srcDir,
            from: projectConfig.srcDir,
            to: projectConfig.distDir
        }

    ],{
        ignore: [
            'client/index.html',
            'api/tsconfig.json',
            'api/**/*.ts',
            "client/**/*.scss",
            "client/**/*.ts",
            "client/**/*.js"
        ],
        debug: true
    }));

    /*************************
     * Extending Rules
     **************************/

    prodConfig.module.rules.push({
        test: /\.scss$/,
        loaders: ExtractTextPlugin.extract({ fallback: 'style-loader', loader: ['css-loader','sass-loader']})
    });


    prodConfig.mode = "production";
    return prodConfig;
};