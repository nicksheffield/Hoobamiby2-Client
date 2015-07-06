angular.module('app.services')

.factory('$memory', ['$localStorage', '$socket',
	function($localStorage, $socket){
		var mem = {
			game: {},
			submissions: {},
			token: '',
			player: {
				nickname: $localStorage.nickname
			},
			forget: function(){
				this.player = {};
				delete $localStorage.nickname;
			}
		};

		$socket.on('gameUpdate', function(game){
			
			mem.game = game;

			console.log('gameUpdate', game);
		});

		$socket.on('playerUpdate', function(player){
			mem.player = player;
			console.log('playerUpdate', player);
		});

		return mem;
	}
]);