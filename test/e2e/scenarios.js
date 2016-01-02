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
      ngMockE2E.clearMockModules();
    });

    it('should support sorting by conference name', function() {
      $httpBackend.when('GET', 'data/confs.json').respond(function(method, url, data) {
        var request = new XMLHttpRequest();

        request.open('GET', 'data/test-confs.json', false);
        request.send(null);

        return [request.status, request.response, {}];
      });

      browser.get('app/index.html');

      var sortColumn = element.all(by.repeater('conf in displayedConferences').column('conf.name'));

      function getNames() {
        return sortColumn.map(function(elm) {
          return elm.getText();
        });
      }

      expect(getNames()).toEqual([
        'Webstock (2015)',
        'Webstock (2014)', 
        'Agile Australia (2014)'
      ]);

      element(by.xpath('//th[@st-sort="name"]')).click();

      expect(getNames()).toEqual([
        'Agile Australia (2014)', 
        'Webstock (2014)', 
        'Webstock (2015)'
      ]);
    });
  });
});
