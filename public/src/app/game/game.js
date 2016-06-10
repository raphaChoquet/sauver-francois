(function() {
    'use strict';

    var App = function() {
        var self = this;

        self.assets = {
            president: null,
            badGuys: null,
            walls: null,
            arrival: null
        };

        self.init = function(playerType, playerRoom, socket) {
            self.playerType = playerType;
            self.room = playerRoom;
            self.socket = socket;
            self.events = events;
            self.cursors = null;
            self.states = {
                preload: preload.init,
                create: create.init,
                update: update.init
            };

            self.maps = maps;
            self.mapNumber = Math.floor(Math.random() * (self.maps.length));

            self.game = new Phaser.Game(750, 500, Phaser.CANVAS, 'canvas-game', self.states);
        };


        return this;
    };

    var app = new App();

    var preload = require('./states/preload')(app);
    var create = require('./states/create')(app);
    var update = require('./states/update')(app);
    var events = require('./events/update.events')(app);
    var maps = require('./utils/map');

    module.exports = app;

})();
