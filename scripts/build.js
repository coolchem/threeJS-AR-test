
const util = require('./util');
const sass = require('node-sass');
const path = require("path");
const fs = require("fs-extra");
const projectConfig = require("../project.config");


util.series(["npm run clean","npm run lint"], function (err) {

    if(err)
    {
        console.log(err);
        process.exit(1);
    }

    let tasks;

    if(process.env.NODE_ENV === "production")
    {
        tasks = [
            {fn:buildTypescript,
                args:[true]
            },
            {fn:bundleFiles}

        ]
    }
    else if(process.env.NODE_ENV === "build-all") // will build all typescript and sass files
    {

        tasks = [
            {fn:buildTypescript,args:[false,true]},
            {fn:buildSASS}
        ];
    }
    else
    {
        tasks = [
            {fn:buildTypescript}
        ];

    }

    util.callTasksInSeries(tasks,function(err){

        util.finishTask(null,err,true);
    })

});

function buildSASS(cb) {

    let mainSassFilePath = projectConfig.srcClientDir+"/assets/styles/main.scss";
    let outFilePath = projectConfig.srcClientDir+"/assets/styles/main.css";

    sass.render({
        file: mainSassFilePath
    },function(error, result){

        if(!error)
        {
            fs.writeFile(outFilePath,result.css,"utf8",function(err){

                util.finishTask(cb,err,true);

            });
        }
        else
        {
            util.finishTask(cb,error,true);
        }

    });

}

function buildTypescript(cb,isRelease,buildAll){

    let cmd = "tsc";

    if(!buildAll)
    {
        cmd = cmd + " -p src/api"; // only need to build api as client code is taken care by webpack
    }

    if(!isRelease)
        cmd = cmd + " --sourceMap";

    util.exec(cmd, function (err) {

        util.finishTask(cb,err,true);
    });

}

function bundleFiles(cb){

    util.exec("webpack -p",function(err) {
        if(err)
            cb(err);
        else
        {
            cb();
        }
    });
}
