var path = require('path');

module.exports = function(grunt) {
  var BUILD_DIR = 'build';
  var INSTRUMENT_DIR = BUILD_DIR + '/instrument';
  var REPORT_DIR = BUILD_DIR + '/reports';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: [
      BUILD_DIR
    ],

    watch: {
      testci: {
        files: ['<%= jshint.all %>'],
        tasks: ['test']
      },

      runci: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['package']
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },

      all : [
        'Gruntfile.js',
        'app.js',
        'index.js',
        'server/**/*.js',
        'test/**/*.js'
      ]
    },

    instrument : {
      files : [
        'app.js',
        'index.js',
        'server/**/*.js'
      ],

      options : {
        basePath : INSTRUMENT_DIR
      }
    },

    storeCoverage : {
      options : {
        dir : REPORT_DIR
      }
    },

    makeReport : {
      src : 'build/reports/**/*.json',
      options : {
        type : 'lcov',
        dir : REPORT_DIR,
        print : 'text-summary,html'
      }
    },

    simplemocha: {
      options: {
        timeout: '40s',
        reporter: 'spec',
        recursive: true
      },

      all: {
        src: ['test/**/*.js']
      }
    },

    express: {
      server: {
        options: {
          server: path.resolve('./app.js'),
          watchChanges: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-istanbul');
  grunt.loadNpmTasks('grunt-express');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('enableCoverage', function() {
    process.env.TEST_COVERAGE = 'true';
  });

  grunt.registerTask('test', ['jshint', 'simplemocha']);
  grunt.registerTask('test-ci', ['watch:testci']);
  grunt.registerTask('test-cov', [ 'clean', 'enableCoverage', 'instrument', 'test', 'storeCoverage', 'makeReport' ]);
  grunt.registerTask('run', ['express', 'express-keepalive']);
  grunt.registerTask('run-ci', ['express', 'watch:runci']);
};