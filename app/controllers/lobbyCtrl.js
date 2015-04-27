angular.module('app.controllers')

.controller('lobbyCtrl', ['$scope', '$socket', '$memory', '$state',
	function($scope, $socket, $memory, $state) {
		
		$scope.roomName = '';

		$scope.join = function(){
			console.log($scope.roomName);
			$socket.emit('join', {
				roomName: $scope.roomName,
				nickname: $memory.player.nickname
			});
		};

		$socket.emit('leave');

		$scope.create = function(){
			console.log($socket.id);
			$socket.emit('create', { nickname: $memory.player.nickname });
		};

		$socket.on('gameJoined', function(data){
			$memory.game = data.game;
			$memory.player = data.player;

			console.log(data.player);

			$state.go('game', {roomName: data.game.roomName.toUpperCase()});
		});

		$socket.on('noGame', function(){
			console.log('no game exists at', $scope.roomName);
		});

		$socket.on('gameCreated', function(data){
			console.log('gameCreated');
			$memory.game = data.game;
			$memory.player = data.player;

			$state.go('game', {roomName: data.game.roomName.toUpperCase()});
		});
	}
]);