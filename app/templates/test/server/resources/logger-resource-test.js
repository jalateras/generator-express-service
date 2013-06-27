var rewire = require('rewire');
var log4js = rewire('log4js');
var util = require('util');
var request = require('request');
var http = require('http');
var should = require('should');
var libpath = process.env.TEST_COVERAGE ? '../../../build/instrument' : '../../..';
var app = require('express')();
var authenticated = require('../helper/authenticated-helper');
var testResource = rewire(libpath + '/server/resources/logger-resource')(app, authenticated);

describe("exercise logger resource api", function() {
  var httpServer;
  var baseUrl;

  before(function(done) {
    httpServer = http.createServer(app);
    httpServer.listen(0, function() {
      baseUrl = util.format("http://%s:%s", '127.0.0.1', httpServer.address().port);
      done();
    });
  });

  after(function() {
    httpServer.close();
  });

  describe("exercise /logger", function() {
    describe("when we exercise the get apir", function() {
      var statusCode;
      var loggerInfo;

      before(function(done) {
        var options = {
          url: baseUrl + "/logger"
        };

        request.get(options, function(error, response, body) {
          statusCode = response.statusCode;
          loggerInfo = body;
          done();
        });
      });

      it("should return with a 200", function() {
        statusCode.should.equal(200);
      });

      it("should return with a non-empty body", function() {
        should.exist(loggerInfo);
      });
    });

    describe("when we exercise the post api", function() {
      var statusCode;

      before(function(done) {
        var options = {
          url: baseUrl + "/logger"
        };

        request.post(options, function(error, response, body) {
          statusCode = response.statusCode;
          done();
        });
      });

      it("should return with a 404", function() {
        statusCode.should.equal(404);
      });
    });

    describe("when we exercise the delete api", function() {
      var statusCode;

      before(function(done) {
        var options = {
          url: baseUrl + "/logger"
        };

        request.del(options, function(error, response, body) {
          statusCode = response.statusCode;
          done();
        });
      });

      it("should return with a 404", function() {
        statusCode.should.equal(404);
      });
    });

    describe("when we exercise the put api", function() {
      var statusCode;

      before(function(done) {
        var options = {
          url: baseUrl + "/logger"
        };

        request.put(options, function(error, response, body) {
          statusCode = response.statusCode;
          done();
        });
      });

      it("should return with a 404", function() {
        statusCode.should.equal(404);
      });
    });
  });

  describe("exercise /logger/:logLevel", function() {
    describe("when we exercise the put api", function() {
      var statusCode;

      before(function(done) {
        var options = {
          url: baseUrl + "/logger/INFO"
        };

        request.put(options, function(error, response, body) {
          statusCode = response.statusCode;
          request.get(baseUrl + '/logger', function(error, response, body) {
            done();
          });
        });
      });

      it("should return with a 200", function() {
        statusCode.should.equal(200);
      });
    });

    describe("when we exercise the get api", function() {
      var statusCode;
      var responseBody;

      before(function(done) {
        var options = {
          url: baseUrl + "/logger/info"
        };

        request.get(options, function(error, response, body) {
          statusCode = response.statusCode;
          responseBody = body;
          done();
        });
      });

      it("should return with a 200", function() {
        statusCode.should.equal(200);
      });

      it("should have a non-empty body", function() {
        should.exist(responseBody);
      });
    });

    describe("when we exercise the post api using /logger/debug", function() {
      var statusCode;

      before(function(done) {
        var options = {
          url: baseUrl + "/logger/debug"
        };

        request.post(options, function(error, response, body) {
          statusCode = response.statusCode;
          done();
        });
      });

      it("should return with a 404", function() {
        statusCode.should.equal(404);
      });
    });

    describe("when we exercise the delete api using /logger/info", function() {
      var statusCode;

      before(function(done) {
        var options = {
          url: baseUrl + "/logger/info"
        };

        request.del(options, function(error, response, body) {
          statusCode = response.statusCode;
          done();
        });
      });

      it("should return with a 404", function() {
        statusCode.should.equal(404);
      });
    });
  });

  describe("exercise /logger/:category/:logLevel", function() {
    describe("when we exervicse the put api using /logger/server/INFO", function() {
      var statusCode;
      var logCategory;

      before(function(done) {
        var options = {
          url: baseUrl + "/logger/server/INFO"
        };

        request.put(options, function(error, response, body) {
          statusCode = response.statusCode;
          request.get(baseUrl + '/logger/server', function(error, response, body) {
            logCategory = JSON.parse(body);
            done();
          });
        });
      });

      it("should return with a 200", function() {
        statusCode.should.equal(200);
      });

      it("should set the server category to INFO", function() {
        logCategory.level.levelStr.should.eql("INFO");
      });
    });

    describe("when we exercise the get api using /logger/server/info", function() {
      var statusCode;

      before(function(done) {
        var options = {
          url: baseUrl + "/logger/server/info"
        };

        request.get(options, function(error, response, body) {
          statusCode = response.statusCode;
          done();
        });
      });

      it("should return with a 404", function() {
        statusCode.should.equal(404);
      });
    });

    describe("when we issue a POST to /logger/server/info", function() {
      var statusCode;

      before(function(done) {
        var options = {
          url: baseUrl + "/logger/server/info"
        };

        request.post(options, function(error, response, body) {
          statusCode = response.statusCode;
          done();
        });
      });

      it("should return with a 404", function() {
        statusCode.should.equal(404);
      });
    });

    describe("when we exercise the delete api using /logger/server/info", function() {
      var statusCode;

      before(function(done) {
        var options = {
          url: baseUrl + "/logger/server/info"
        };

        request.del(options, function(error, response, body) {
          statusCode = response.statusCode;
          done();
        });
      });

      it("should return with a 404", function() {
        statusCode.should.equal(404);
      });
    });
  });
});