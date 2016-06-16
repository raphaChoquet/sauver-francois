(function() {
    'use strict';

    var App = function() {
        var self = this;

        self.rooms = {};
        self.myRoom = null;
        self.playerType = null;

        self.init = function(socket, launchGame) {
            self.socket = socket;
            self.list.init();
            self.launchGame = launchGame;
            self.listener.listen();
            self.socket.emit('rooms.get', '');
        };

        self.readyToLaunch = function(room, socketId, playerType) {
            if (self.myRoom === room && '/#' + self.socket.id === socketId) {
                self.playerType = playerType;
                self.launchGame();
            }
        }

        self.create = function (room) {
            app.myRoom = room;
            app.socket.emit('room.create', app.myRoom);
        };

        self.join = function (room) {
            app.myRoom = room;
            app.socket.emit('room.join', app.myRoom);
        };

        return this;
    };

    var app = new App();

    app.form = require('./controller/form')(app);
    app.list = require('./controller/list')(app);
    app.listener = require('./services/listener')(app);

    module.exports = app;

})();
