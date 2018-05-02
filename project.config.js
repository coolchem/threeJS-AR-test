
const path = require("path");

const config = {};

const rootDir = path.resolve("./");

const srcDir = rootDir + "/src";
const distDir = rootDir + "/dist";

const clientDir = "client";
const apiDir = "api";

config.Environments = {

    DEVELOPMENT:"development",
    TEST:"test",
    PRODUCTION:"production"

};

config.rootDir = rootDir;
config.distDir = distDir;
config.srcDir = srcDir;
config.testsDir = rootDir + "/tests";

config.srcClientDir = srcDir + '/' + clientDir;
config.srcClientDirMain = config.srcClientDir + "/main.ts";
config.srcClientDirIndex = config.srcClientDir + "/index.html";
config.srcClientDirMainCSS = config.srcClientDir + "/assets/styles/main.scss";
config.srcApiDir = srcDir + '/' + apiDir;

config.distClientDir = distDir + '/' + clientDir;
config.distClientDirMain = "./main.js";
config.distClientDirIndex =  "./index.html";
config.distClientDirMainCSS = "./assets/styles/main.css";
config.distApiDir = distDir + '/' + apiDir;

module.exports = config;