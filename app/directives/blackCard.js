angular.module('app.directives')

.directive('blackCard', [
	function() {

		function link(scope, el, attrs){
			scope.$watch('data', function(newVal, oldVal){
				if(scope.data !== undefined){
					scope.data.text = scope.data.text.replace('%s', '_____');
					scope.data.text = scope.data.text.replace('%s2', '_____');
					scope.data.text = scope.data.text.replace('%s3', '_____');
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