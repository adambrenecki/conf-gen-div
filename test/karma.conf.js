module.exports = function(config){
  var configuration = {
    preprocessors: {
      'components/conflist/conflist.html': ['ng-html2js']
    },

    basePath : '../',

    files : [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-smart-table/dist/smart-table.min.js',
      'app/js/**/*.js',
      'test/unit/**/*.js',
      '**/*.html',
      // fixtures
      {pattern: 'test/fixtures/**/*.json', watched: true, served: true, included: false}
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    // start these browsers
    browsers: ['Chrome'],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    ngHtml2JsPreprocessor: {
      moduleName: 'my.templates',
      // strip this from the file path
      stripPrefix: 'base/app/',
      // stripSuffix: '.ext',
      // prepend this to the
//       prependPrefix: 'served/',


    }
  };

  if(process.env.TRAVIS){
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration);  
};