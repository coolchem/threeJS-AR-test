
const path = require("path");
const util = require('./util');
const httpPort = 3000;


const webpackConfig = require("../webpack.config");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const compiler = webpack(webpackConfig);

let server;
let webpackPlugin;

util.exec("npm run build",function(){

    serve();

});


function serve(){

    server = require("../src/api/server");
    webpackPlugin = webpackMiddleware(compiler,{
        lazy: false,
        watchOptions: {
            aggregateTimeout: 300,
            poll: true
        }
    });

    let hotReloadPlugin = require("webpack-hot-middleware")(compiler);

    server.start(httpPort,[webpackPlugin,hotReloadPlugin]);

    console.log('Server running at http://localhost:' + httpPort);
}

function reload(filePath){
    tinylr.changed({
        body: {
            files: [path.resolve('./' + filePath)]
        }
    });
}

function myWatch(filePaths,cb){
    chokidar.watch(filePaths).on('change', cb);
}

process.on('exit', function(code){
    webpackPlugin.close();
    server.close();
});

//catches ctrl+c event
process.on('SIGINT', function(){
    webpackPlugin.close();
    server.close();
});

process.on('SIGTERM', function(){
    webpackPlugin.close();
    server.close();
});

process.on('SIGHUP', function(){
    webpackPlugin.close();
    server.close();
});

//catches uncaught exceptions
process.on('uncaughtException', function (err) {
    console.log(err)
   webpackPlugin.close();
   server.close();
});