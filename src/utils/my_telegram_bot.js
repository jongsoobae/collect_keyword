var bot = require('./telegram').bot;
var config = require('root-require')('config');

function sendMessage(msg) {
    var bot_id = config.get('telegram.bot.my.id');
    return bot.sendMessage(bot_id, msg);
}

module.exports = {
    sendMessage: sendMessage
};
