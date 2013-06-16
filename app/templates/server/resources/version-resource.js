var log4js = require('log4js');
var moment = require('moment');

require('pkginfo')(module, 'name', 'version');
var pkgName = module.exports.name;
var pkgVersion = module.exports.version;

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.json(200, {
      name:  pkgName,
      version: pkgVersion,
      startTime: moment(app.serverStats.startTime).format('Do MMM YYYY, HH:mm:ss')
    });
  });
};
