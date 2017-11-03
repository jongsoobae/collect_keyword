var config = require('root-require')('config');

if(!process.env.NTBA_FIX_319) process.env.NTBA_FIX_319 = true;

const TelegramBot = require('node-telegram-bot-api');
const token = config.get('telegram.token');
const bot = new TelegramBot(token, {polling: true});

exports.bot = bot;
