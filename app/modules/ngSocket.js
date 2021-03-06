angular.module('ngSocket', [])

.factory('$socket', ['$rootScope',
	function($rootScope) {
		var socket = io.connect(location.protocol + '//' + location.hostname + ':8001');

		return {
			id: socket.id,
			on: function(eventName, callback) {
				socket.on(eventName, function() {
					var args = arguments;
					$rootScope.$apply(function() {
						callback.apply(socket, args);
					});
				});
			},
			emit: function(eventName, data, callback) {
				socket.emit(eventName, data, function() {
					var args = arguments;
					$rootScope.$apply(function() {
						if (callback) {
							callback.apply(socket, args);
						}
					});
				});
			}
		};
	}
]);