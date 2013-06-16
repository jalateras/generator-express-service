var express = require('express');
var path = require('path');
var util = require('util');
var log4js = require('log4js');
var urlLogger = log4js.getLogger('url');

var app =  module.exports = express();

// set the default log level
log4js.setGlobalLogLevel('INFO');

app.configure(function () {
  app.use(express.query());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.logger({
    format: ':remote-addr ":method :url" :status :res[content-length] :response-time',
    stream: {
      write: function(message) {
        urlLogger.info(message.trim());
      }
    }
  }));
});

app.configure('development', function () {
  app.use(express.errorHandler());
});

// Capture some app stats
app.serverStats = {
  startTime: new Date()
};

// Expose the API
require('./server/api')(app);

