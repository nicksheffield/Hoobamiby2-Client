angular.module('app.directives')

.directive('card', ['$memory', '$socket',
	function($memory, $socket) {

		function link(scope, el, attrs) {

			scope.choose = function(){
				console.log('clicked');
				// if the amount of cards the player has submitted is less than the pick amount
				// and the game has started
				if($memory.player.submissions.length < $memory.game.blackCard.pick && $memory.game.started && !$memory.player.waiting){
					// then add this card to the players submissions
					$memory.player.submissions.push(scope.data);

					console.log('emitting');

					// send the submission to the server
					$socket.emit('submit', scope.data);
				}
			};

			// check if a card has been submitted
			scope.submitted = function(card){
				var result = _.find($memory.player.submissions, function(c){
					return c.text == card.text;
				});

				return result;
			};
			
			scope.memory = $memory;
		}

		return {
			restrict: 'E',
			templateUrl: 'app/views/cardDirective.html',
			scope: {
				'data': '=',
				'clickable': '=',
				'chosen': '='
			},
			link: link
		};
	}
]);