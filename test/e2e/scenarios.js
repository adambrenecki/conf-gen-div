'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('The App', function() {

  describe('Main view', function() {

    var ngMockE2E = require('ng-mock-e2e');
    var $httpBackend = ngMockE2E.$httpBackend;
    var confNames = element.all(by.repeater('conf in displayedConferences').column('conf.name'));
 
    beforeEach(function() {
      ngMockE2E.addMockModule();
      ngMockE2E.addAsDependencyForModule('app');
      ngMockE2E.embedScript('/bower_components/angular-mocks/angular-mocks.js');

      $httpBackend.when('GET', 'data/confs.json').respond(function(method, url, data) {
        var request = new XMLHttpRequest();

        request.open('GET', '../test/fixtures/test-confs.json', false);
        request.send(null);

        return [request.status, request.response, {}];
      });

      browser.get('app/index.html');
    });

    afterEach(function () {
      ngMockE2E.clearMockModules();
    });

    function getNames() {
      return confNames.map(function(elm) {
        return elm.getText();
      });
    }

    it('should default sort by descending diversity', function() {
      expect(getNames()).toEqual([
        'ZZZZZ Best Diversity (2014)', 
        'AAAAA Middle Diversity (2013)', 
        'MMMMM Worst Diversity (2012)'
      ]);
    });

    it('should support bidirectional sorting by conference name', function() {
      var nameSorter = '//th[@st-sort="name"]';

      element(by.xpath(nameSorter)).click();

      expect(getNames()).toEqual([
        'AAAAA Middle Diversity (2013)', 
        'MMMMM Worst Diversity (2012)', 
        'ZZZZZ Best Diversity (2014)'
      ]);

      element(by.xpath(nameSorter)).click();

      expect(getNames()).toEqual([
        'ZZZZZ Best Diversity (2014)', 
        'MMMMM Worst Diversity (2012)', 
        'AAAAA Middle Diversity (2013)'
      ]);
    });

    it('should support bidirectional sorting by diversity', function() {
      var diversitySorter = '//th[@st-sort="diversityPercentage"]';

      element(by.xpath(diversitySorter)).click(); // skip natural sorted state
      element(by.xpath(diversitySorter)).click();

      expect(getNames()).toEqual([
        'MMMMM Worst Diversity (2012)', 
        'AAAAA Middle Diversity (2013)',
        'ZZZZZ Best Diversity (2014)'
      ]);    

      element(by.xpath(diversitySorter)).click();

      expect(getNames()).toEqual([
        'ZZZZZ Best Diversity (2014)', 
        'AAAAA Middle Diversity (2013)', 
        'MMMMM Worst Diversity (2012)'
      ]);
    });

    it('should support bidirectional sorting by year', function() {
      var yearSorter = '//th[@st-sort="year"]';

      element(by.xpath(yearSorter)).click();

      expect(getNames()).toEqual([
        'MMMMM Worst Diversity (2012)', 
        'AAAAA Middle Diversity (2013)',
        'ZZZZZ Best Diversity (2014)'
      ]);    

      element(by.xpath(yearSorter)).click();

      expect(getNames()).toEqual([
        'ZZZZZ Best Diversity (2014)', 
        'AAAAA Middle Diversity (2013)', 
        'MMMMM Worst Diversity (2012)'
      ]);

    });

  });
});
