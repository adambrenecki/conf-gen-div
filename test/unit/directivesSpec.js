'use strict';

describe('Conf List directive', function() {

	var $compile,
			$httpBackend,
			$rootScope;

  beforeEach(function() {
    module('smart-table');
    module('app');
  });

  beforeEach(inject(function(_$compile_, _$httpBackend_, _$rootScope_, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('components/conflist/conflist.html').respond([{}]);
    $httpBackend.expectGET('data/confs.json').respond([{name: 'Agile Australia'}, {year: '2014'}]);

    $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));

  it('should create confs data model with data fetched from xhr', function() {
    expect($rootScope.loadedConferences).toBeUndefined();
  	$compile("<conflist></conflist>")($rootScope);
  	$rootScope.$digest();
    $httpBackend.flush();

    expect($rootScope.loadedConferences).toEqual([{name: 'Agile Australia'}, {year: '2014'}]);
  });

  describe('helper functions', function() {
    it('year should provide a friendly version of the conf year', function() {
      jasmine.clock().mockDate(new Date(2015, 1, 1));
    	$compile("<conflist></conflist>")($rootScope);
    	$rootScope.$digest();
      expect($rootScope.friendlyYear({year: 2015})).toEqual("this year")
      expect($rootScope.friendlyYear({year: 2014})).toEqual("last year")
      expect($rootScope.friendlyYear({year: 2013})).toEqual("2 years ago")
    });

    it('numberOfMen should derive number of men from other fields', function() {
    	$compile("<conflist></conflist>")($rootScope);
    	$rootScope.$digest();
      expect($rootScope.numberOfMen({totalSpeakers: 20, numberOfWomen: 3})).toEqual(17)
    });

    it('diversityPercentage should derive diversity percentage from other fields', function() {
    	$compile("<conflist></conflist>")($rootScope);
    	$rootScope.$digest();
      expect($rootScope.diversityPercentage({totalSpeakers: 20, numberOfWomen: 3})).toEqual(15)
    });

    it('diversityScore should score each diversity percentage using school grades', function() {
    	$compile("<conflist></conflist>")($rootScope);
    	$rootScope.$digest();
      expect($rootScope.diversityScore({totalSpeakers: 100, numberOfWomen: 50})).toEqual('A');
      expect($rootScope.diversityScore({totalSpeakers: 100, numberOfWomen: 49})).toEqual('B');
      expect($rootScope.diversityScore({totalSpeakers: 100, numberOfWomen: 39})).toEqual('C');
      expect($rootScope.diversityScore({totalSpeakers: 100, numberOfWomen: 29})).toEqual('D');
      expect($rootScope.diversityScore({totalSpeakers: 100, numberOfWomen: 19})).toEqual('E');
      expect($rootScope.diversityScore({totalSpeakers: 100, numberOfWomen: 9})).toEqual('F');
      expect($rootScope.diversityScore({totalSpeakers: 100, numberOfWomen: 0})).toEqual('F');

    });

  })
});
