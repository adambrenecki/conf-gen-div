'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('The App', function() {

  describe('Main view', function() {

    var ngMockE2E = require('ng-mock-e2e');
    var $httpBackend = ngMockE2E.$httpBackend;
 
    beforeEach(function() {
      ngMockE2E.addMockModule();
      ngMockE2E.addAsDependencyForModule('app');
      ngMockE2E.embedScript('/bower_components/angular-mocks/angular-mocks.js');
    });

    afterEach(function () {
      var originalAddExpectationResult = jasmine.Spec.prototype.addExpectationResult;
      jasmine.Spec.prototype.addExpectationResult = function() {
        if (!arguments[0]) {
          browser.takeScreenshot().then(function(png) {
            var stream = fs.createWriteStream("/tmp/screenshot.png");
            stream.write(new Buffer(png, 'base64'));
            stream.end();
          });          // this.description and arguments[1].message can be useful to constructing the filename.
        }
        return originalAddExpectationResult.apply(this, arguments);
      };

      ngMockE2E.clearMockModules();
    });

    it('should support sorting by conference name', function() {
      $httpBackend.when('GET','data/confs.json').respond(200, [{
        "name":"Agile Australia ",
        "location":"Melbourne, Australia",
        "year":"2014",
        "totalSpeakers":63,
        "numberOfWomen":13,
        "source":"http://www.agileaustralia.com.au/speakers.php",
        "Notes":""
      }]);

      browser.get('app/index.html');

      var sortColumn = element.all(by.repeater('conf in displayedConferences').column('conf.name'));

      function getNames() {
        return sortColumn.map(function(elm) {
          return elm.getText();
        });
      }

      expect(getNames()).toEqual([
        'Webstock (2012)', 
        'Webstock (2015)', 
        'Webstock (2014)', 
        'Products are Hard (2013)', 
        'RubyConf (2015)', 
        'Webstock (2013)', 
        'Agile Australia (2015)', 
        'JS Conf Melbourne (2014)', 
        'Agile Australia (2014)', 
        'Webstock (2011)', 
        'YOW (2015)', 
        'YOW (2014)', 
        'LAST (2013)', 
        'LAST (2014)', 
        'YOW Lambda Jam (2014)', 
        'Webstock (2010)', 
        'YOW (2013)', 
        'YOW West (2014)', 
        'RubyConf (2014)', 
        'YOW (2013)', 
        'YOW West (2015)', 
        'DevOps Days (2015)', 
        'YOW Lambda Jam (2015)', 
        'DevOps Downunder (2013)', 
        'YOW Lambda Jam (2013)'
      ]);

      element(by.xpath('//th[@st-sort="name"]')).click();

      expect(getNames()).toEqual([
        'Agile Australia (2015)', 
        'Agile Australia (2014)', 
        'DevOps Days (2015)', 
        'DevOps Downunder (2013)', 
        'JS Conf Melbourne (2014)', 
        'LAST (2013)', 
        'LAST (2014)', 
        'Products are Hard (2013)', 
        'RubyConf (2014)', 
        'RubyConf (2015)', 
        'Webstock (2014)', 
        'Webstock (2015)', 
        'Webstock (2013)', 
        'Webstock (2012)', 
        'Webstock (2011)', 
        'Webstock (2010)', 
        'YOW (2013)', 
        'YOW (2014)', 
        'YOW (2013)', 
        'YOW (2015)', 
        'YOW Lambda Jam (2013)', 
        'YOW Lambda Jam (2014)', 
        'YOW Lambda Jam (2015)', 
        'YOW West (2014)', 
        'YOW West (2015)']);
    });
  });
});
