'use strict';

const _ = require('lodash');

module.exports = function(app) {
    return {
        rooms: {},

        getAll: function(socket, data) {
            socket.emit('room.retrieved', this.rooms);
        },

        create: function(socket, room) {
            if (this.rooms[room]) {
                app.socket.log('ERROR: Room ' + room + ' exist');
                socket.emit('room.exist', room);
                return;
            }
            let playerType = 'player';
            this.rooms[room] = [{
                id: socket.id,
                player: playerType
            }];

            socket.join(room);
            app.socket.log('Client ID ' + socket.id + ' created room ' + room);

            app.socket.io.emit('room.created', room, socket.id, playerType);
        },

        join: function(socket, room) {

            if (!this.rooms[room]) {
                socket.emit('room.dont-exist', room);
            } else if (this.rooms[room].length === 2) {
                socket.emit('room.full', room);
            }

            let active = _.get(this.rooms[room], '[0].player', null);
            let playerType = active === 'player' ? 'helper' : 'player';
            this.rooms[room].push({
                id: socket.id,
                player: playerType
            });
            socket.join(room);
            app.socket.io.emit('room.joined', room, socket.id, playerType);
        },

        leave: function(socket, data) {
            for (var r in this.rooms) {
                var _user = _.findKey(this.rooms[r], {
                    id: socket.id
                });

                if (_user) {
                    app.socket.log(_user + ' deleted');
                    this.rooms[r].splice(_user, 1);
                    if (this.rooms[r].length === 0) {
                        delete this.rooms[r];
                        app.socket.io.emit('room.deleted', r);
                    } else {
                        app.socket.io.emit('room.available', r, socket.id);
                    }
                    break;
                }
            }
        }
    }
}
