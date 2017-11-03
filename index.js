var sch = require('node-schedule');

var crawler = require('root-require')('src/actions/crawling');
var config = require('root-require')('config');

var models = require('./src/models');
var bot = require('./src/utils/my_telegram_bot');
var ee = require('./src/utils/ee');

var j = sch.scheduleJob(config.get('scheduler.cron'), function() {
  try {
    var save_data = new models.keyword(crawler.do());
    save_data.save().then(function(d){
    });
  }
  catch(e) {
    bot.sendMessage(e);
    j.cancel();
    ee.emit('close');
  }
});

