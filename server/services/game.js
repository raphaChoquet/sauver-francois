'use strict';

const _ = require('lodash');

module.exports = function(app){
	return {
		update: function(socket, updates) {
            app.socket.io.emit('game.updateHelper', updates);
		}
	}
}
