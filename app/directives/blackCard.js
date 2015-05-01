angular.module('app.directives')

.directive('blackCard', [
	function() {

		function link(scope, el, attrs){
			scope.$watch('data', function(newVal, oldVal){
				if(scope.data !== undefined){
					scope.data = scope.data.replace('%s', '_____');
					scope.data = scope.data.replace('%s2', '_____');
					scope.data = scope.data.replace('%s3', '_____');
					scope.data = scope.data.replace('\\', '<br>');
				}
			});
		}

		return {
			restrict: 'E',
			templateUrl: 'app/views/blackCardDirective.html',
			scope: {
				'data': '='
			},
			link: link
		};
	}
]);