'use strict';

/* Controllers */

angular.module('app', ['smart-table'])
	.controller('ConfListCtrl', ['$scope', '$http', '$filter', 
		function($scope, $http, $filter) {
		  $http.get('data/confs.json').success(function(data) {
		    $scope.loadedConferences = data;
		  });
		  $scope.displayedConferences = [].concat($scope.loadedConferences);
		}]
	);
