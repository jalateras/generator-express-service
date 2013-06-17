'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var fsutil = require('../util/fs-utils');

var ResourceGenerator = module.exports = function ResourceGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the resource sub-generator with the argument ' + this.name + '.');
};

util.inherits(ResourceGenerator, yeoman.generators.NamedBase);

ResourceGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'resourcePath',
      message: 'What is the URL to the resource?',
      default: '/' + this.name
    },
    {
      type: 'confirm',
      name: 'supportGet',
      message: 'Do you want to support GET?',
      default: true
    },
    {
      type: 'confirm',
      name: 'supportPut',
      message: 'Do you want to support PUT?',
      default: false
    },
    {
      type: 'confirm',
      name: 'supportPost',
      message: 'Do you want to support POST?',
      default: false
    },
    {
      type: 'confirm',
      name: 'supportDelete',
      message: 'Do you want to support DELETE?',
      default: false
    }
  ];

  this.prompt(prompts, function (props) {
    this.resourcePath = props.resourcePath;
    this.supportGet = props.supportGet;
    this.supportPut = props.supportPut;
    this.supportPost = props.supportPost;
    this.supportDelete = props.supportDelete;

    cb();
  }.bind(this));
};

ResourceGenerator.prototype.createFiles = function files() {
  this.resourceFileName = this.name + '-resource';
  this.resourceSourceFile = path.join('./server/resources', this.resourceFileName + ".js");
  this.resourceTestFile = path.join('./test/server/resources', this.resourceFileName + '-test.js');
  this.template('_resource.js', this.resourceSourceFile);
  this.template('_test-resource.js', this.resourceTestFile);
};

ResourceGenerator.prototype.updateApi = function files() {
  fsutil.rewriteFile({
    file: '/server/api.js',
    needle: '#END-ROUTES',
    splicable: [
      "require('./resources/" + this.resourceFileName + "')(app);"
    ]
  });
};

ResourceGenerator.prototype.createSupportedActions = function files() {
  if (this.supportGet === true) {
    fsutil.rewriteFile({
      file: this.resourceSourceFile,
      needle: '#END-RESOURCE',
      splicable: [
        "  app.get('/" + this.name + "', function(req, res) {",
        "    res.send(200);",
        "  });",
        ""
      ]
    });

    fsutil.rewriteFile({
      file: this.resourceTestFile,
      needle: '#END-TEST-RESOURCE',
      splicable: [
        "  describe('exercise get api', function() {",
        "  });",
        ""
      ]
    });
  }

  if (this.supportPut === true) {
    fsutil.rewriteFile({
      file: this.resourceSourceFile,
      needle: '#END-RESOURCE',
      splicable: [
        "  app.put('/" + this.name + "', function(req, res) {",
        "    res.send(200);",
        "  });",
        ""
      ]
    });

    fsutil.rewriteFile({
      file: this.resourceTestFile,
      needle: '#END-TEST-RESOURCE',
      splicable: [
        "  describe('exercise put api', function() {",
        "  });",
        ""
      ]
    });
  }

  if (this.supportPost === true) {
    fsutil.rewriteFile({
      file: this.resourceSourceFile,
      needle: '#END-RESOURCE',
      splicable: [
        "  app.post('/" + this.name + "', function(req, res) {",
        "    res.send(200);",
        "  });",
        ""
      ]
    });

    fsutil.rewriteFile({
      file: this.resourceTestFile,
      needle: '#END-TEST-RESOURCE',
      splicable: [
        "  describe('exercise post api', function() {",
        "  });",
        ""
      ]
    });
  }

  if (this.supportDelete === true) {
    fsutil.rewriteFile({
      file: this.resourceSourceFile,
      needle: '#END-RESOURCE',
      splicable: [
        "  app['delete']('/" + this.name + "', function(req, res) {",
        "    res.send(200);",
        "  });",
        ""
      ]
    });

    fsutil.rewriteFile({
      file: this.resourceTestFile,
      needle: '#END-TEST-RESOURCE',
      splicable: [
        "  describe('exercise delete api', function() {",
        "  });",
        ""
      ]
    });
  }
};