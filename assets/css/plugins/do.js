var plugin = function(){
	return function(style){
		style.define('do', function(a) {
			var props = [];
			for(var i=0; i<arguments.length; i++){
				props.push(arguments[i].name+' 0.3s cubic-bezier(0.4, 0, 0.2, 1)');
			}

			return props.join(', ');
		});
	};
};
module.exports = plugin;