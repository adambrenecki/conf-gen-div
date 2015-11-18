'use strict';

/* Controllers */

var app = angular.module('app', []);

app.controller('ConfListCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('data/confs.json').success(function(data) {
    $scope.conferences = data;
  });

  $scope.orderProp = '-diversityPercentage';
}]);
