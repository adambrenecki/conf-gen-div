'use strict';


var controller = function($scope, $http, $filter) {
	$http.get('data/confs.json').success(function(data) {
		for (var i = 0; i < data.length; i += 1) {
			data[i]['numberOfMen'] = data[i].totalSpeakers - data[i].numberOfWomen;
			data[i]['diversityPercentage'] = data[i].numberOfWomen / data[i].totalSpeakers * 100
			data[i]['diversityScore'] = (function() {
				var percentage = data[i]['diversityPercentage'];
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
			})();	
			// console.log(data[i]['diversityScore']);
		}
		$scope.loadedConferences = data;
	});
	
	$scope.displayedConferences = [].concat($scope.loadedConferences);
};

var directive = function() {
	return {
		scope: true,
		templateUrl: 'components/conflist/conflist.html',
		controller: controller,
		controllerAs: 'ctrl'
	};

};

angular.module('app', ['smart-table'])
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
