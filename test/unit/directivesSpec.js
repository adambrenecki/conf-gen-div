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
});
