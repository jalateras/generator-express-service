var log4js = require('log4js');
var util = require('util');


module.exports = function(app, ensureLoggedIn) {
  app.get('/logger', ensureLoggedIn('/login'), function(req, res) {
    res.send(200, log4js);
  });


  app.put('/logger/:logLevel', ensureLoggedIn('/login'), function(req, res) {
    var logLevel = req.params.logLevel;
    if (logLevel) {
      log4js.setGlobalLogLevel(logLevel);
    }
    res.send(200, null);
  });

  app.get('/logger/:category', ensureLoggedIn('/login'), function(req, res) {
    var category = req.params.category;
    res.send(200, log4js.getLogger(category));
  });

  app.put('/logger/:category/:logLevel', ensureLoggedIn('/login'), function(req, res) {
    var category = req.params.category;
    var logLevel = req.params.logLevel;
    if (category && logLevel) {
      log4js.getLogger(category).setLevel(logLevel);
    }
    res.send(200, null);
  });
};
