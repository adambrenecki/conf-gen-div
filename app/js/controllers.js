'use strict';

/* Controllers */

angular.module('app', ['smart-table'])
.controller('ConfListCtrl', ['$scope', '$http', '$filter', 
	function($scope, $http, $filter) {
		$http.get('data/confs.json').success(function(data) {
			$scope.loadedConferences = data;
		});
		
		$scope.displayedConferences = [].concat($scope.loadedConferences);

		$scope.numberOfMen = function (conf) {
			return (conf.totalSpeakers - conf.numberOfWomen);
		};

		$scope.diversityPercentage = function (conf) {
			return (conf.numberOfWomen / conf.totalSpeakers * 100) | $filter('number')(0);
		};

		$scope.diversityScore = function (conf) {
			var percentage = this.diversityPercentage(conf);
			if (percentage < 10) {
				return "F";
			} else if (percentage < 20) {
				return "E";
			} else if (percentage < 30) {
				return "D";
			} else if (percentage < 40) {
				return "C";
			} else if (percentage < 50) {
				return "B";
			} else {
 				return "A";
 			}
		};
	}]
);
