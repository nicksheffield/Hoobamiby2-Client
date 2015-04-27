angular.module('app.controllers')

.controller('mainCtrl', ['$scope', '$state', '$memory',
	function($scope, $state ,$memory) {

		$scope.memory = $memory;
		$scope.openMenu = false;

		$scope.showMenu = function(){
			$scope.openMenu =! $scope.openMenu;
		};

		$scope.logout = function(){
			$memory.forget();
			$state.go('login');
			$scope.openMenu = false;
		};

	}
]);