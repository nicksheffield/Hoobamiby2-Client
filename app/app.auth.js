angular.module('app.routes')

.run(['$rootScope', '$state', '$memory',
	function($rootScope, $state, $memory) {

		$rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
			if(!toState.data) return;

			var requireLogin = toState.data.requireLogin;

			// if the page requires login, but there is no nickname
			if(requireLogin && !$memory.player.nickname){
				// then stop the route change
				event.preventDefault();

				// store the roomname in the memory
				$memory.token = toParams.roomName;

				// and redirect to the login page
				$state.go('login');
			}

			// if the player is logged in, and they try going to login
			if(toState.name == 'login' && $memory.player.nickname){
				// then stop the route change
				event.preventDefault();

				// and send them back to the lobby
				$state.go('lobby');
			}

		});

	}
]);
