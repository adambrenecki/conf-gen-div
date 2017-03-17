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

    describe('helper functions', function() {
      var stubConf;
      beforeEach(function() {
        jasmine.clock().mockDate(new Date(2015, 1, 1));
        stubConf = {totalSpeakers: 20, numberOfWomen: 3};
      });

      it('year should provide a friendly version of the conf year', function() {
        expect(scope.friendlyYear({year: 2015})).toEqual("this year")
        expect(scope.friendlyYear({year: 2014})).toEqual("last year")
        expect(scope.friendlyYear({year: 2013})).toEqual("2 years ago")
      });

      it('numberOfMen should derive number of men from other fields', function() {
        expect(scope.numberOfMen(stubConf)).toEqual(17)
      });

      it('diversityPercentage should derive diversity percentage from other fields', function() {
        expect(scope.diversityPercentage(stubConf)).toEqual(15)
      });

      it('diversityScore should score each diversity percentage using school grades', function() {
        expect(scope.diversityScore({totalSpeakers: 100, numberOfWomen: 50})).toEqual('A');
        expect(scope.diversityScore({totalSpeakers: 100, numberOfWomen: 49})).toEqual('B');
        expect(scope.diversityScore({totalSpeakers: 100, numberOfWomen: 39})).toEqual('C');
        expect(scope.diversityScore({totalSpeakers: 100, numberOfWomen: 29})).toEqual('D');
        expect(scope.diversityScore({totalSpeakers: 100, numberOfWomen: 19})).toEqual('E');
        expect(scope.diversityScore({totalSpeakers: 100, numberOfWomen: 9})).toEqual('F');
        expect(scope.diversityScore({totalSpeakers: 100, numberOfWomen: 0})).toEqual('F');

      });

    })
  });
});
