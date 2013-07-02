var config = require('../config/config');

module.exports = function() {
  if (config.isAuthenticationEnabled()) {
    return require('connect-ensure-login').ensureLoggedIn;
  } else {
    return function(req, res, next) {
      next();
    };
  }
};