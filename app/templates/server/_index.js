var util = require('util');
var app = require('./app');
var config = require('./server/config/config');
var logger = require('log4js').getLogger('app');

var port = process.env.PORT || 3000;
var host = process.env.HOST || 'localhost';
var server;
var protocol;

if (config.isSSLEnabled()) {
  var http = require('https');
  protocol = 'https';
  server = http.createServer({key: config.getSSLPrivateKey(), cert: config.getSSLCertificate()}, app);
} else {
  var http = require('http');
  protocol = 'http';
  server = http.createServer(app);
}

server.listen(port, host, function () {
  var info = server.address();
  logger.info("Express app listening at [%s]", util.format('%s://%s:%s', protocol, info.address, info.port));
});

