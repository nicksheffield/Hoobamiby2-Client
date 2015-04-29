angular.module('app.controllers')

.controller('gameoverCtrl', ['$scope', '$memory', '$socket', '$state',
	function($scope, $memory, $socket, $state) {
		$scope.winner = {
			blackCards: []
		};

		_.forEach($memory.game.players, function(player){
			if(player.blackCards.length > $scope.winner.blackCards.length){
				$scope.winner = player;
			}
		});

		$scope.reset = function(){
			$socket.emit('reset');
		};

		$socket.on('resetGame', function(){
			console.log('resetGame');
			$state.go('game', {roomName: $memory.game.roomName});
		});
	}
]);