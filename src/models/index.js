var mongoose = require('mongoose');
require('./db');

var Schema = mongoose.Schema;
var KeywordSchema = new Schema({
    'date': Date,
    'date_str': String,
    'data': Array
});

module.exports.keyword = mongoose.model('n_keyword', KeywordSchema);

