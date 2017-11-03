var config = require('root-require')('config');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var _db = (function() {
    var db_host = config.get('db.mongodb.host');
    var db_port = config.get('db.mongodb.port');
    var db = mongoose.connection;
    db.on('error', function(e) {
        console.error(e);
    });	
    db.once('open', function() {
        console.log('connected to mongod server.');
    });

    mongoose.connect(`mongodb://${db_host}:${db_port}/keywords`, {
        useMongoClient: true
    });	
})();

function gracefulExit() {
    global.ee.emit('close');
}

process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

