'use strict';

/* Controllers */

angular.module('app', ['smart-table'])
	.controller('ConfListCtrl', ['$scope', '$http', 
		function($scope, $http) {
		  $http.get('data/confs.json').success(function(data) {
		    $scope.conferences = data;
		  });
		}]
	);
