var rewire = require('rewire');
var log4js = rewire('log4js');
var util = require('util');
var request = require('request');
var http = require('http');
var should = require('should');
var libpath = process.env.TEST_COVERAGE ? '../../../build/instrument' : '../../..';
var app = rewire(libpath + '/app');

// kill url logging
app.__set__(
  'urlLogger', {
    'info': function() {}
  }
);

describe("exercise <%= _.slugify(name) %> resource api", function() {
  var baseUrl;
  var httpServer;

  before(function(done) {
    httpServer = http.createServer(app);
    httpServer.listen(0, function() {
      baseUrl = util.format("http://%s:%s", '127.0.0.1', httpServer.address().port);
      done();
    });
  });

  after(function(done) {
    httpServer.close();
    done();
  });

 }); //#END-TEST-RESOURCE