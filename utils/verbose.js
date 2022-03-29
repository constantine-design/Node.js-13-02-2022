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

module.exports = {
    verbose
}