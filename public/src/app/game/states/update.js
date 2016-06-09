(function() {
    'use strict';

    var update = function(app) {

        var u = {

            init: function() {
                var _a = app.assets;

                app.game.physics.arcade.collide(_a.president, _a.walls, app.events.restartGame, null, true);
                app.game.physics.arcade.collide(_a.badGuys, _a.president, app.events.restartGame, null, true);
                app.game.physics.arcade.collide(_a.president, _a.arrival, app.events.levelEnd, null, true);
                app.game.physics.arcade.collide(_a.walls, _a.badGuys);

                if (app.cursors.right.isDown) {
                    _a.president.body.x += 5;
                }

                if (app.cursors.left.isDown) {
                    _a.president.body.x -= 5;
                }

                if (app.cursors.up.isDown) {
                    _a.president.body.y -= 5;
                }

                if (app.cursors.down.isDown) {
                    _a.president.body.y += 5;
                }
            }

        };

        return u;
    };

    module.exports = update;
})();
