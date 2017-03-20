'use strict'; 

var filter;

describe('The friendlyYear filter', function () {

  beforeEach(function () {
    module('app');
	jasmine.clock().mockDate(new Date(2015, 1, 1));

    inject(function ($injector) {
      filter = $injector.get('$filter')('friendlyYear');
    });
  });

  it('should turn the numeric year into a conversation version of itself', function () {
      expect(filter(2015)).toEqual("this year");
      expect(filter(2014)).toEqual("last year");
      expect(filter(2013)).toEqual("2 years ago");
  });
});

describe('The scoreClass filter', function () {

  beforeEach(function () {
    module('app');

    inject(function ($injector) {
      filter = $injector.get('$filter')('scoreClass');
    });
  });

  it('should find the appropriate CSS class for the diversityPercentage', function () {
      expect(filter(50)).toEqual('percentage-cohort-a');
      expect(filter(49)).toEqual('percentage-cohort-b');
      expect(filter(39)).toEqual('percentage-cohort-c');
      expect(filter(29)).toEqual('percentage-cohort-d');
      expect(filter(19)).toEqual('percentage-cohort-e');
      expect(filter(9)).toEqual('percentage-cohort-f');
      expect(filter(0)).toEqual('percentage-cohort-f');
  });
});