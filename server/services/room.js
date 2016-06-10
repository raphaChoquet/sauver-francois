'use strict';

const _ = require('lodash');

module.exports = function(app){
    return {
        rooms: {},

        /// FUNCTION ///
        getAll: function (socket) {
            socket.emit('retrieve rooms', app.room.rooms);
        },
		/// FUNCTION ///
		join: function(socket, room) {
			app.socket.log('Received request to create or join room ' + room);

			if(!this.rooms[room]){
				this.create(socket, room);
		    }

		    if(this.rooms[room].length === 2){
				// full
				socket.emit('full', room);
		    } else {
				// join
				let active = _.get(this.rooms[room], '[0].player', null);
				let playerType = active === 'player' ? 'helper' : 'player';

				this.rooms[room].push({id: socket.id, player: playerType});

				socket.join(room);
				socket.emit('joined', room, socket.id, playerType);
				app.socket.log(this.rooms[room]);
		    }

		    socket.emit('rooms', { rooms: app.room.rooms });
		},
        create: function (socket, room) {
            this.rooms[room] = [];
            app.socket.log('Client ID ' + socket.id + ' created room ' + room);
        },
		leave: function(id){
			for (var r in this.rooms) {
				var _user = _.findKey(this.rooms[r], {id: id});

				if (_user) {
					app.socket.log(_user + ' deleted');
					this.rooms[r].splice(_user, 1);

		        	break;
				}
		    }
		}
	}
}
