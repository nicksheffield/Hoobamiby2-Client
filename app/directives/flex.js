angular.module('app.directives')

.directive('flex', [
	function(){
		function link(scope, el, attrs){
			attrs.$observe('flex', function(value){
				el.css('flex', parseInt(value));
			});
		}

		return {
			restrict: 'A',
			link: link
		};
	}
]);