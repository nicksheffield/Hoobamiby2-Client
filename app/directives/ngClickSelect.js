/**
 * ngClickSelect
 *
 * @author Anders D. Johnson
 * @url https://github.com/adjohnson916/ng-click-select
 * @license MIT
 */

angular.module('app.directives')

.directive('ngClickSelect', function() {
	return {
		restrict: 'AC',
		link: function(scope, element, attrs) {
			element.bind('click', function() {
				this.select();
			});
		}
	};
});