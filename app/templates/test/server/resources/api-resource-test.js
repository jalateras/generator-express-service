var _ = require('lodash');
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

describe("exercise api resource", function() {
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

  describe("exercise /api", function() {
    describe("when we issue a get to /api", function() {
      var statusCode;
      var api;

      before(function(done) {
        var options = {
          url: baseUrl + "/api"
        };

        request.get(options, function(error, response, body) {
          statusCode = response.statusCode;
          api = JSON.parse(body);
          done();
        });
      });

      it("should return with a 200", function() {
        statusCode.should.equal(200);
      });

      it("should return with a non-empty body", function() {
        should.exist(api);
      });

      it("should include the version url", function() {
        should.exist(findRoute(api, '/'));
      });

      it("should include the logger url", function() {
        should.exist(findRoute(api, '/logger'));
      });

      it("should include the api url", function() {
        should.exist(findRoute(api, '/api'));
      });
    });
  });
});

function findRoute(api, url) {
  return _.find(_.keys(api), function(route) {
    return route === url;
  });
}