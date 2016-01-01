'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('The App', function() {

  describe('Main view', function() {

    beforeEach(function() {
      browser.get('app/index.html');
    });

    it('should support sorting by conference name', function() {

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
