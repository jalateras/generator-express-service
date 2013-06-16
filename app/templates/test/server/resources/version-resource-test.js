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

describe("exercise version resource api", function() {
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

  describe("exercise /", function() {
    describe("when we issue a GET to /", function() {
      var statusCode;
      var versionInfo;

      before(function(done) {
        var options = {
          url: baseUrl + "/"
        };

        request.get(options, function(error, response, body) {
          statusCode = response.statusCode;
          versionInfo = JSON.parse(body);
          done();
        });
      });

      it("should return with a 200", function() {
        statusCode.should.equal(200);
      });

      it("should return with a non-empty body", function() {
        should.exist(versionInfo);
      });

      it("should contain a name", function() {
        should.exist(versionInfo.name);
      });

      it("should contain a version", function() {
        should.exist(versionInfo.version);
      });

      it("should contain a startTime", function() {
        should.exist(versionInfo.startTime);
      });
    });
  });
});