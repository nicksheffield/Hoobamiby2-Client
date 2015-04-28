angular.module('app.controllers')

.controller('gameoverCtrl', ['$scope', '$memory',
	function($scope, $memory) {
		$scope.winner = {
			blackCards: []
		};

		_.forEach($memory.game.players, function(player){
			if(player.blackCards.length > $scope.winner.blackCards.length){
				$scope.winner = player;
			}
		});

		console.log($scope.winner);
	}
]);