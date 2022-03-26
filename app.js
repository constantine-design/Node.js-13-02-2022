const fs = require("fs");
const yargs = require('yargs');
const logger = require("./utils/logger");
const { seek } = require("./utils/file-seek");

const appArgs = yargs(process.argv).argv;
if (!appArgs.file) {
    error('APP STOPPED: --file arguments are required');
    process.exit(1);
}
if (!appArgs.dir) appArgs.dir = 'demo-files';

logger.gray("-------------------------------------");
logger.gray("              App start:             ");
logger.gray("-------------------------------------");

const notifications = seek(appArgs.file, appArgs.dir);

notifications.addListener('error', error => logger.error(error.toString()) );
notifications.addListener('success', content => logger.info('File content:', content.toString()) );

