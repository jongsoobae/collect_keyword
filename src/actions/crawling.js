var request = require('sync-request');
var cheerio = require('cheerio');
var moment = require('moment');
var config = require('root-require')('config');

function get_parsed_data() {

  var target_url = config.get('request.target');
  try {
    var res = request('GET', target_url);
    if( 200 > res.statusCode || res.statusCode >= 300 ) {
      throw new Error(`Not good loading ${target_url}`);
    }

    var $ = cheerio.load(res.getBody());
    var root_div = $('div.keyword_rank.select_date li.list > a.list_area');
    if(root_div.length < 20) throw new Error('Parsed keyword count below 20. check dom error.');

    var kwargs = root_div.map(function(i, _elem) {
      var elem = $(this);
      var name = elem.find('span.title').text();
      var rank = elem.find('em.num').text();
      return {'name': name, 'rank': rank};
    }).get();

    var date_str = $('div.keyword_rank.select_date strong.rank_title').text();
    var di = date_str.match(/\d+/g);

    var result = {
      'date': moment(`${di[0]}-${di[1]}-${di[2]} ${di[3]}:${di[4]}:${di[5]}`).format(),
      'data': kwargs
    };

  }
  catch(e) {
    throw new Error(`Error loading ${target_url}`);
  }

  console.log(`crawling success. at ${result.date}`);
  return result;
}

exports.do = get_parsed_data;
