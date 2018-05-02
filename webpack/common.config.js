
let webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
let projectConfig = require("../project.config");


module.exports = function (options) {

    /*************************
     * Common Entry
     **************************/

    let entry = {
        'main': [
            projectConfig.srcClientDirMain
        ]
    };

    if(!(options.env == projectConfig.Environments.TEST))
    {
        entry.main = entry.main.concat([
            projectConfig.srcClientDirIndex,
            projectConfig.srcClientDirMainCSS
        ])
    }


    /*************************
     * Common Plugins
     **************************/

    let plugins = [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),

    ];

    if(!(options.env === "test"))
    {

        let htmlWebPackPlugin =   new HtmlWebpackPlugin({
            template: projectConfig.srcClientDirIndex,
            chunksSortMode: 'dependency',
            metadata: options,
            inject: 'body'
        });

        plugins.push(htmlWebPackPlugin);
    }

     /*************************
     * Common rules
     **************************/

     let typescriptLoader = {test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        query: {
            tsconfig: projectConfig.rootDir+"/tsconfig.json"
        }
    };

    if(options.env === "test" && !options.isLocalTesting) //adding inline source map only for test node environment
    {
        typescriptLoader.query.sourceMap = false;
        typescriptLoader.query.inlineSourceMap = true;
    }

    let rules = [

        typescriptLoader,

        {
            test: /\.html$/,
            loader: "underscore-template-loader" // loaders: ['underscore-template-loader'] is also perfectly acceptable.
        }

    ];


    return {
        mode: 'development',
        entry:entry,
        output: {
            path: projectConfig.distClientDir,
            filename: '[name].js'
        },
        resolve: {
            extensions: [ '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
            modules: [
                "src",
                "node_modules"
            ]
        },
        module: {
            rules: rules
        },
        plugins: plugins,
        node:  {
            global: true,
            crypto: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    }
};