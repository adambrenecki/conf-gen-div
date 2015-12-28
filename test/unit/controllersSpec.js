'use strict';

/* jasmine specs for controllers go here */
describe('Controllers', function() {

  describe('ConfListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(function() {
      module('smart-table');
      module('app');
    });

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('data/confs.json').respond([{name: 'Agile Australia'}, {year: '2014'}]);

      scope = $rootScope.$new();
      ctrl = $controller('ConfListCtrl', {$scope: scope});
    }));

    it('should create confs data model with data fetched from xhr', function() {
      expect(scope.loadedConferences).toBeUndefined();
      $httpBackend.flush();

      expect(scope.loadedConferences).toEqual([{name: 'Agile Australia'}, {year: '2014'}]);
    });

    describe('getters', function() {
      var stubConf, getters;
      beforeEach(function() {
        stubConf = {totalSpeakers: 20, numberOfWomen: 3};
        getters = scope.getters;
      });

      it('should derive number of men from other fields', function() {
        expect(getters.numberOfMen(stubConf)).toEqual(17)
      });

      it('should derive diversity percentage from other fields', function() {
        expect(getters.diversityPercentage(stubConf)).toEqual(15)
      });

    })
  });
});
