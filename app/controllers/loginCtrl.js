angular.module('app.controllers')

.controller('loginCtrl', ['$scope', '$localStorage', '$state', '$memory',
	function($scope, $localStorage, $state, $memory) {
		
		$scope.login = function(){
			$memory.player.nickname = $memory.player.nickname.substring(0, 10);
			
			if($memory.player.nickname.trim() !== ''){
				$localStorage.nickname = $memory.player.nickname;
				if($memory.token){
					$state.go('game', {roomName: $memory.token});
				}else{
					$state.go('lobby');
				}
			}
		};
	}
]);