module.exports = function(config){
  var configuration = {

    basePath : '../',

    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-smart-table/dist/smart-table.min.js',
      'app/js/**/*.js',
      'test/unit/**/*.js',

      // fixtures
      {pattern: 'test/fixtures/**/*.json', watched: true, served: true, included: false}
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
    // start these browsers
    browsers: ['Chrome', 'ChromeCanary'],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },


  };

  if(process.env.TRAVIS){
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration);  
};