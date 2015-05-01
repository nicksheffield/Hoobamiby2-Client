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

		$socket.on('gameUpdate', function(data){
			
			mem.game = data;
			
			// gotta shuffle here somehow

			console.log('gameUpdate', data);
		});

		$socket.on('playerUpdate', function(data){
			mem.player = data;
			console.log('playerUpdate', data);
		});

		return mem;
	}
]);