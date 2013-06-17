'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');

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
    }
  ];

  this.prompt(prompts, function (props) {
    this.resourceName = props.resourceName;
    this.resourcePath = props.resourcePath;

    cb();
  }.bind(this));
};

ResourceGenerator.prototype.files = function files() {
  this.template('_resource.js', path.join('./server/resources/' + this.name + "-resource.js"));
};
