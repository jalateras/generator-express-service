var path = require('path');
var fs = require('fs');
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

  var getSSLPrivateKey = function() {
    var privateKeyLocation = getConfig('SSL_PRIVATE_KEY');
    if (!privateKeyLocation) {
      privateKeyLocation = path.join(__dirname, '../sslcert/server.key');
    }

    return fs.readFileSync(privateKeyLocation).toString();
  };

  var getSSLCertificate = function() {
    var certificateLocation = getConfig('SSL_CERTIFICATE');
    if (!certificateLocation) {
      certificateLocation = path.join(__dirname, '../sslcert/server.crt');
    }
  };

  var isAuthenticationEnabled = function() {
    var authEnabled = getConfig('AUTHENTICATION_ENABLED');
    if (authEnabled && authEnabled === false) {
      return false;
    }

    return true;
  };

  return {
    get: getConfig,
    getSSLPrivateKey: getSSLPrivateKey,
    getSSLCertificate: getSSLCertificate,
    isAuthenticationEnabled: isAuthenticationEnabled
  };
})();



