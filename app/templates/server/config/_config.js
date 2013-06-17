var nconf = require('nconf');

module.exports = (function() {
  var userConfigFile = process.env.HOME + '.<%= _.slugify(serviceName) %>.json';
  if (process.env.CONFIG_FILE) {
    userConfigFile = process.env.CONFIG_FILE;
  }

  nconf.argv().env().file({file: userConfigFile}).defaults(require('../etc/default-config'));

  var getConfig = function(key) {
    return nconf.get(key);
  };

  return {
    get: getConfig
  };
})();



