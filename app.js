const fs = require("fs");
const http = require("http");
const yargs = require('yargs');
const logger = require("./utils/logger");
const { seek } = require("./utils/file-seek");
const { verbose, verboseSteam } = require("./utils/verbose");

const appArgs = yargs(process.argv).argv;
if (!appArgs.file) {
    logger.error('CANT CONTINUE: --file argument is required');
    process.exit(1);
}
if (!appArgs.dir) appArgs.dir = 'demo-files';

logger.gray("App started");
logger.gray("-------------------------------------");

// HOMEWORK 2-3 Create async writing file and Write log
// -----------------------------------------------------
/*const notifications = seek(appArgs.file, appArgs.dir);
notifications.addListener('error', error => {
    logger.error(error.toString());
    if (appArgs.verbose) verbose(error, true);
} );
notifications.addListener('success', content => {
    logger.info('File content:', content.toString());
    if (appArgs.verbose) verbose(content);
} );*/


// DEMO Stream copy file through stream
// -------------------------------------
/*const readDemoFile$ = fs.createReadStream('./demo-files/demo-read.txt', { encoding: 'utf-8' });
const writeDemoFile$ = fs.createWriteStream('./demo-files/demo-read-copy.txt')
readDemoFile$.pipe(writeDemoFile$);
readDemoFile$.on('data', chunk => { console.log(chunk); });
readDemoFile$.on('close', () => { console.log('STREAM WAS CLOSED'); });*/


const PORT = 3000;
const server$ = http.createServer();
server$.listen(PORT, ()=>logger.info(`Server startrd at http:\\localhost:${PORT}`));

server$.on('request', (srvRequest, responce$)=>{
    if (appArgs.verbose) verboseSteam(srvRequest.url);
    switch(srvRequest.url) {
        case "/": 
            fs.createReadStream("./demo-files/demo-index.html").pipe(responce$);
            break;
        case "/favicon.ico":
            fs.createReadStream("./demo-files/favicon-demo.ico").pipe(responce$);
            break;
        default:
            responce$.destroy();
    }
})






