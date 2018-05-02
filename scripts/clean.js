

const del = require('del');
const projectConfig = require('../project.config');

const paths = del.sync([
    'coverage',
    projectConfig.srcDir +'/**/*.css',
    '!'+ projectConfig.srcClientDir +'/assets/fonts/**/*.css',
    projectConfig.srcDir +'/**/*.js',
    '!'+ projectConfig.srcDir +'/**/libs/**/*',
    projectConfig.srcDir +'/**/*.map',
    projectConfig.testsDir+"/**/*.js",
    projectConfig.testsDir +'/**/*.map',
    projectConfig.distDir,'temp',"reporters"]);

console.log('Deleted files/folders:\n', paths.join('\n'));


