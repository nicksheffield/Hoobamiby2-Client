angular.module('app.directives')

.directive('icon', [
	function() {
		return {
			restrict: 'EA',
			scope: {
				'glyph': '@'
			},
			template: '<i class="fa fa-{{glyph}}"></i>'
		};
	}
]);