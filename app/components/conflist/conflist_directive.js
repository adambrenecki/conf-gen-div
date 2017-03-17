angular.module('app', ['smart-table']).directive('conflist', function() {
	return {
		scope: true,
		templateUrl: 'conflist.html'
	};
});