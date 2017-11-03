var models = require('root-require')('src/models');
var bot = require('root-require')('src/utils/my_telegram_bot');
var ee = require('root-require')('src/utils/ee');

var crawler = require('root-require')('src/actions/crawling');

try {
  var save_data = new models.keyword(crawler.do());
  save_data.save().then(function(d){
    console.log(d);
    ee.emit('close');
  });
}
catch(e) {
  bot.sendMessage(e);
  ee.emit('close');
}

