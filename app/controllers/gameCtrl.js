angular.module('app.controllers')

.controller('gameCtrl', ['$scope', '$memory', '$state', '$stateParams', '$socket',
	function($scope, $memory, $state, $stateParams, $socket) {
		var roomName = $stateParams.roomName;

		// if there is no room name, redirect out
		if (!roomName) $state.go('lobby');

		// if there is no game loaded in mem
		if ($memory.game.roomName === undefined) {
			// then join the game
			$socket.emit('join', {
				roomName: roomName,
				nickname: $memory.player.nickname
			});
		}

		// start the game
		$scope.start = function() {
			$socket.emit('start');
		};

		// choose the winner
		$scope.choose = function(playerID) {
			if ($memory.player.isJudge) {
				$socket.emit('choose', {
					socketID: playerID
				});
			}
		};

		// if no game was joinable, go to lobby
		$socket.on('noGame', function() {
			$state.go('lobby');
		});

		// if the game was joined, then update the player data
		$socket.on('gameJoined', function(data) {
			$memory.game = data.game;
			$memory.player = data.player;
		});
	}
]);