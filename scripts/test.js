
var util = require('./util');

util.exec("npm run lint",(err) =>{
    if(err)
    {
        console.log(err);
        process.exit(1);
    }

    if(process.env.TEST_E2E) // look for End to End testing
    {
        var protractorCMD = "protractor";

        util.series(["webdriver-manager update --standalone",protractorCMD],function (err) {

            if(err)
            {
                console.log(err);
                process.exit(1);
            }

            process.exit(0);
        })
    }
    else
    {
        if(process.env.TEST_BROWSER)
        {

            var testCMD = "karma start";

            testCMD = testCMD + " --browsers " + process.env.TEST_BROWSER;
            util.series([testCMD], function(err){

                if(err)
                {
                    console.log(err);
                    process.exit(1);
                }

                process.exit(0);
            });
        }
        else
        {

            util.series(["npm run clean","karma start --single-run --no-auto-watch --browsers PhantomJS"], function(err){

                if(err)
                {
                    console.log(err);
                    process.exit(1);
                }

                process.exit(0);
            });
        }

    }
});



