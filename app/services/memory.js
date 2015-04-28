angular.module('app.services')

.factory('$memory', ['$localStorage', '$socket',
	function($localStorage, $socket){
		var mem = {
			game: {},
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
			// shuffle doesn't work, figure out something else
			// data.submissions = _.shuffle(data.submissions);
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