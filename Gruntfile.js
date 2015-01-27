module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    app: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'client/controllers/*.js', 'test/**/*.js',
        'server.js', 'server/**/*.js'
      ],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },
    compass: { // Task
      dist: { // Target
        options: { // Target options
          sassDir: 'client/styles',
          cssDir: 'client/styles'
        }
      }
    }
  });



  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.registerTask('default', ['compass', 'jshint']);

};
