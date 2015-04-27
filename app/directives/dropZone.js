angular.module('app.directives')

.directive('dropZone', [
	function() {

		function link(scope, el, attrs) {
			scope.doTheThing = function(event, obj){
				
				console.log(obj.draggable[0]);
				//scope.submission = ;
				
			};

			scope.dropOptions = {
				onDrop: 'doTheThing'
			};
		}

		return {
			restrict: 'E',
			templateUrl: 'app/views/dropZoneDirective.html',
			scope: {
				'model': '='
			},
			link: link
		};
	}
]);