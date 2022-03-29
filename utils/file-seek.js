const fs = require("fs");
const EventEmitter = require('events');

function seek(target, path) {
    const notifications = new EventEmitter();
    fs.access('./'+path , function (err) {
        if (err) {
            notifications.emit('error', err);
            return notifications;
        }
        fs.readFile('./'+path+'/'+target, function (err, data) {
            if (err) {
                notifications.emit('error', err);
                return notifications;
            }
            notifications.emit('success', data);
        });
    });
    return notifications;
}

module.exports = {
    seek
}