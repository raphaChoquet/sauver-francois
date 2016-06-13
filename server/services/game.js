'use strict';

const _ = require('lodash');

module.exports = function(app) {
    return {
        update: function(socket, infos) {
            app.socket.io.to(infos.room).emit('game.updateHelper', infos.updates);
        },

        win: function(socket, room) {
            app.socket.io.to(room).emit('game.winHelper');
        }
    }
}
