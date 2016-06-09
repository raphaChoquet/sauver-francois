module.exports = function(app){
	return {
		rooms: {},

		/// FUNCTION ///
		join: function(socket, room){
			app.socket.log('Received request to create or join room ' + room);
		    if(!this.rooms[room]){
					this.create(socket, room);
		    }

		    if(this.rooms[room].length === 2){
					// full
		      socket.emit('full', room);
		    } else {
		      // join
		      this.rooms[room].push(socket.id);
		      socket.join(room);
		      socket.emit('joined', room, socket.id);
		      app.socket.log(this.rooms[room]);
		      /*if(this.rooms[room].length === 2) {
						app.socket.io.sockets.in(room).emit('ready');
					}*/

		    }
		    
		    socket.emit('rooms', app.room.rooms);
		    console.log(app.room.rooms);
		},

		create: function (socket, room) {
			this.rooms[room] = [];
			app.socket.log('Client ID ' + socket.id + ' created room ' + room);
		},

		leave: function(id){
			for (var r in this.rooms) {
		      var _user = this.rooms[r].indexOf(id);
		      if (_user !== -1) {
		        app.socket.log(_user + ' deleted');
		        this.rooms[r].splice(_user, 1);

		        break;
		      }
		    }
		}
	}
}
