const fs = require('fs');


function verbose(content, error=false) {
    const date = new Date().toISOString();
    let logContent = date+" [SUCCESS] Added: '"+content+"'\n";
    if (error) logContent = date+" [!ERROR!] "+content+"\n";
    const directory = './logs';
    const file = '/events.log';
    if(!fs.existsSync(directory)) fs.mkdirSync(directory);
    fs.appendFile(directory+file, logContent , err => {
        if (err) {
            console.error(err.toString());
            return false;
        }
    return true;
    })
}

function verboseSteam(content, error=false) {
    const directory = './logs';
    const file = '/requests.log';
    const date = new Date().toISOString();
    let logContent = date+" [CONNECT] Requested: '"+content+"'\n";
    if (error) logContent = date+" [!ERROR!] "+content+"\n";
    fs.access(directory, (dirError) => {
        if (dirError) fs.mkdirSync(directory);
        const writeLog$ = fs.createWriteStream(directory+file, { 'flags': 'a', encoding: 'utf-8' });
        writeLog$.on('error', (errorStream) => {
            console.error(errorStream.toString());
            return false;
        });
        writeLog$.write(logContent);
        writeLog$.end();
    });
    return true;
}

module.exports = {
    verbose,
    verboseSteam
}