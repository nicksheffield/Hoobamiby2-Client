angular.module('app.controllers')

.controller('gameCtrl', ['$scope', '$memory', '$state', '$stateParams', '$socket',
	function($scope, $memory, $state, $stateParams, $socket) {
		$scope.showHand = false;
		
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
			console.log(playerID);
			if ($memory.player.isJudge && $memory.game.reveal) {
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

		$socket.on('gameOver', function(){
			console.log('Game Over!');
			_.forEach($memory.game.players, function(player){
				if(player.blackCards.length > $scope.winner.blackCards.length){
					$scope.winner = player;
				}
			});
		});


		/*
			Game over stuff
		*/
		$scope.winner = {
			blackCards: []
		};

		

		$scope.reset = function(){
			$socket.emit('reset');
		};

		$socket.on('resetGame', function(){
			console.log('resetGame');
			$state.go('game', {roomName: $memory.game.roomName});
		});
		
		$scope.submissions = [];
		
		$scope.$watch('memory.game.submissions', function(newVal, oldVal){
			console.log('submissions newVal', newVal);
		});
		
		$scope.$watch('memory.game.players', function(newVal, oldVal){
			console.log('players newVal', newVal);
		});
	}
]);