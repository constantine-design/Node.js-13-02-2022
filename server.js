const { app } = require("./app");
const path = require('path');
const yargs = require('yargs');
const { seek } = require("./utils/file-seek");
const { verbose, verboseSteam } = require("./utils/verbose");
const logger = require("./utils/log");
const bp = require('body-parser');

const appArgs = yargs(process.argv).argv;
if (!appArgs.file) appArgs.file = 'requests.log';
if (!appArgs.dir) appArgs.dir = 'demo-files';

const PORT = 3000;
app.listen(PORT, ()=>logger.info(`Server startrd at http://localhost:${PORT}`));

