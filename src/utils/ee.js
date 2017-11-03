var events = require('events');
var mongoose = require('mongoose');

if(!global.ee) { 
    global.ee = new events.EventEmitter();

    global.ee.on('close', function() {
        mongoose.connection.close(function() {
           console.log('Mongoose default connection disconnected through app termination');
           process.exit(0);
        });
    });
}
module.exports = global.ee;

