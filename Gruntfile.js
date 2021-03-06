module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
	  paths: {
		  "src": "src",
		  "build": "dist"
	  },
	  pkg: grunt.file.readJSON('package.json'),
	  replace: {
		  dist: {
			  options: {
				  patterns: [
					  {
						  match: 'version',
						  replacement: '<%= pkg.version %>'
					  },
					  {
						  match: /<script src="assets\/js\/main\.js"><\/script>/,
						  replacement: '<script src="assets/js/main.js?v=<%= pkg.version %>"></script>'
					  }
				  ]
			  },
			  files: [
				  {expand: true, flatten: true, src: ['<%= paths.build %>/index.html'], dest: '<%= paths.build %>/'},
				  {expand: true, flatten: true, src: ['<%= paths.build %>/assets/js/main.js'], dest: '<%= paths.build %>/assets/js/'}

			  ]
		  }
	  },
	  requirejs: {
		  compile: {
			  options: {
				  wrap: true,
				  almond: true,
				  replaceRequireScript: [{
					  files: ['<%= paths.build %>/index.html'],
					  module: 'main'
				  }],
				  modules: [{name: 'main'}],
				  dir: '<%= paths.build %>',
				  appDir: '<%= paths.src %>',
				  baseUrl: 'assets/js',
				  preserveLicenseComments: true,
				  removeCombined: true,
				  optimizeCss: "standard",
				  paths: {
					  'nouislider': '../../../bower_components/nouislider/distribute/jquery.nouislider.all',
					  'requirejs': '../../../bower_components/requirejs/require',
					  'rivets': '../../../bower_components/rivets/dist/rivets',
					  'base64': '../../../bower_components/base64/base64',
					  'crypto': '../../../bower_components/cryptojs/lib/Crypto',
					  'crypto.MD5': '../../../bower_components/cryptojs/lib/MD5',
					  'd3': '../../../bower_components/d3/d3',
					  'es5-shim': '../../../bower_components/es5-shim/es5-shim',
					  'json2': '../../../bower_components/json2/json2',
					  'jquery': "../../../bower_components/jquery/dist/jquery"
				  },
				  shim: {
					  'nouislider': {
						  deps: ['jquery']
					  },
					  'crypto.MD5': {
						  deps: ['crypto']
					  }
				  }
			  }
		  }
	  }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.registerTask('default', ['requirejs', 'replace']);
};