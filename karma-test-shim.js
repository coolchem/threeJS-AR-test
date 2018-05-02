Error.stackTraceLimit = Infinity;


const appContext = require.context('./tests', true, /\.spec\.tsx?$|.test\.tsx?$/);

appContext.keys().forEach(appContext);
