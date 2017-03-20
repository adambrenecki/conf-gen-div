'use strict';

describe('Conf List directive', function() {

	var $compile,
			$httpBackend,
			$rootScope;

	var e1;

  beforeEach(function() {
    module('smart-table');
    module('app');
  });

  beforeEach(module("my.templates")); 

  beforeEach(inject(function(_$compile_, _$httpBackend_, _$rootScope_) {
   	e1 = angular.element("<conflist></conflist");

   	$rootScope = _$rootScope_;
    $compile = _$compile_;

  	$compile(e1)($rootScope.$new());
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('data/confs.json').respond([{name: 'Agile Australia'}, {year: '2014'}]);
    $httpBackend.flush();
  	$rootScope.$digest();

  	e1.controller("conflist");


  }));

  it('should create confs data model with data fetched from xhr', function() {
    expect($rootScope.loadedConferences).toBeUndefined();
    $httpBackend.flush();

    expect($rootScope.loadedConferences).toEqual([{name: 'Agile Australia'}, {year: '2014'}]);
  });
});
