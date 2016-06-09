module.exports = function(app){
	return {
		rooms: [],

		/// FUNCTION ///
		create: function(socket, room){
			app.socket.log('Received request to create or join room ' + room);

			// create
		    if(!this.rooms[room]){
		      this.rooms[room] = [];
		      app.socket.log('Client ID ' + socket.id + ' created room ' + room);
		      socket.emit('created', room, socket.id);
		    }
		    
		    // full
		    if(this.rooms[room].length === 2){
		      socket.emit('full', room);
		    }else{
		      // join
		      this.rooms[room].push(socket.id);
		      socket.join(room);
		      socket.emit('joined', room, socket.id);
		      app.socket.io.sockets.in(room).emit('join', room);
		      app.socket.log(this.rooms[room]);
		      if(this.rooms[room].length === 2)
		        app.socket.io.sockets.in(room).emit('ready');
		    }
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