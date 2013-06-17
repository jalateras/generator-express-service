'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var ExpressServiceGenerator = module.exports = function ExpressServiceGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      npm: true,
      bower: false,
      skipInstall: options['skip-install']
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ExpressServiceGenerator, yeoman.generators.Base);

ExpressServiceGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'serviceName',
    message: 'What is the name of the service?'
  }];

  this.prompt(prompts, function (props) {
    this.serviceName = props.serviceName;

    cb();
  }.bind(this));
};

ExpressServiceGenerator.prototype.app = function app() {
  this.mkdir('server');
  this.mkdir('server/config');
  this.mkdir('server/etc');
  this.mkdir('server/resources');

  this.template('server/_app.js', 'app.js');
  this.template('server/_index.js', 'index.js');

  this.copy('server/api.js', 'server/api.js');
  this.copy('server/etc/default-config.js', 'server/etc/default-config.js');
  this.directory('server/resources', 'server/resources');

  this.template('server/config/_config.js', 'server/config/config.js');

  this.directory('test', 'test');
};

ExpressServiceGenerator.prototype.projectfiles = function projectfiles() {
  this.template('project/_package.json', 'package.json');
  this.template('project/_README.md', 'README.md');

  this.copy('project/CHANGES.md', 'CHANGES.md');
  this.copy('project/Gruntfile.js', 'Gruntfile.js');
  this.copy('project/gitignore', '.gitignore');
  this.copy('project/jshintrc', '.jshintrc');
};
