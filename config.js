var convict = require('convict');

var config = convict({
  "db": {
    "mongodb": {
      "host": {
        "format": String,
        "default": "127.0.0.1"
      },
      "space": {
        "format": String
      }
    }
  },
  "telegram": {
    "token": {
      format: String
    },
    "bot": {
      format: "*"
    }
  },
  "request": {}
});

config.loadFile(`${__dirname}/config/config.default.json`)

config.set('root_dir', __dirname);

module.exports = config;
