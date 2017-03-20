'use strict';

var directive = function() {
	return {
		scope: true,
		templateUrl: 'components/conflist/conflist.html',
		controller: function($scope, $http, $filter) {
			$http.get('data/confs.json').success(function(data) {
				for (var i = 0; i < data.length; i += 1) {
					data[i]['numberOfMen'] = data[i].totalSpeakers - data[i].numberOfWomen;
					data[i]['diversityPercentage'] = data[i].numberOfWomen / data[i].totalSpeakers * 100
				}
				$scope.loadedConferences = data;
			});
			
			$scope.displayedConferences = [].concat($scope.loadedConferences);
		},
		controllerAs: 'ctrl'
	};

};

angular.module('app', ['smart-table'])
	.filter('scoreClass', function() {
		return function (percentage) {
			if (percentage < 10) {
				return "percentage-cohort-f";
			} else if (percentage < 20) {
				return "percentage-cohort-e";
			} else if (percentage < 30) {
				return "percentage-cohort-d";
			} else if (percentage < 40) {
				return "percentage-cohort-c";
			} else if (percentage < 50) {
				return "percentage-cohort-b";
			} else {
				return "percentage-cohort-a";
			}
		}
	})
	.filter('friendlyYear', function() {
		return function (year) {
			var thisYear = new Date().getFullYear();
			var yearDiff = thisYear - year;
			if (yearDiff == 0) {
				return "this year";
			} else if (yearDiff == 1) {
				return "last year";
			} else {
				return yearDiff + " years ago";
			}
		}		
	})
	.directive('conflist', directive);
