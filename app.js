const fs = require("fs");
const yargs = require('yargs');
const logger = require("./utils/logger");
const { seek } = require("./utils/file-seek");
const { verbose } = require("./utils/verbose");

const appArgs = yargs(process.argv).argv;
if (!appArgs.file) {
    logger.error('CANT CONTINUE: --file argument is required');
    process.exit(1);
}
if (!appArgs.dir) appArgs.dir = 'demo-files';

logger.gray("-------------------------------------");
logger.gray("              App start:             ");
logger.gray("-------------------------------------");

const notifications = seek(appArgs.file, appArgs.dir);

notifications.addListener('error', error => {
    logger.error(error.toString());
    if (appArgs.verbose) verbose(error, true);
} );

notifications.addListener('success', content => {
    logger.info('File content:', content.toString());
    if (appArgs.verbose) verbose(content);
} );


