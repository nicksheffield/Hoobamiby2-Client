angular.module('app.routes')

.config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider

			.state('login', {
				url: '/',
				templateUrl: 'app/views/login.html',
				controller: 'loginCtrl',
				data: {
					requireLogin: false
				}
			})

			.state('lobby', {
				url: '/lobby',
				templateUrl: 'app/views/lobby.html',
				controller: 'lobbyCtrl',
				data: {
					requireLogin: true
				}
			})

			.state('game', {
				url: '/game/:roomName',
				templateUrl: 'app/views/game.html',
				controller: 'gameCtrl',
				data: {
					requireLogin: true
				}
			});
	}
]);