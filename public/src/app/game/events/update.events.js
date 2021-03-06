(function() {
    'use strict';

    var events = function(app) {

        var e = {

            /**
             * End of the level
             */
            levelEnd: function() {
                var infos = {
                    room: app.room,
                    infos: { map: app.mapNumber, score: app.timer.getTime() }
                };

                if (app.playerType === 'player') {
                    app.socket.emit('game.win', infos);
                }

                var h = document.getElementById('francois-win');

                h.style.display = 'block';

                app.mapNumber = app.mapNumber == (app.maps.length - 1) ? 0 : app.mapNumber + 1

                app.game.world.removeAll();
                app.states.create();
                app.timer.reset();

                app.assets.winSong.play();

                setTimeout(function() {
                    h.style.display = 'none';
                    app.assets.winSong.destroy();
                }, 4782);
            },

            /**
             * Restart the game
             */
            restartGame: function() {
                app.game.world.removeAll();
                app.states.create();
                app.timer.reset();
            },

            updateGame: function() {
                var badGuys = app.assets.badGuys.children.map(function(badGuy) {
                    return {
                        x: badGuy.body.x,
                        y: badGuy.body.y
                    };
                });

                var updates = {
                    president: {
                        x: app.assets.president.body.x,
                        y: app.assets.president.body.y
                    },
                    badGuys: badGuys
                };

                app.socket.emit('game.update', {
                    updates: updates,
                    room: app.room
                });
            },

            updateHelper: function() {
                app.socket.on('game.updateHelper', function(updates) {
                    app.assets.president.x = updates.president.x;
                    app.assets.president.y = updates.president.y;

                    for (var i = 0; updates.badGuys.length > i; i++) {
                        app.assets.badGuys.children[i].x = updates.badGuys[i].x;
                        app.assets.badGuys.children[i].y = updates.badGuys[i].y;
                    }
                });
            }

        };

        return e;

    };

    module.exports = events;
})();
