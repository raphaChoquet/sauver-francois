(function() {
    'use strict';

    var update = function(app) {

        var u = {

            init: function() {
                var _a = app.assets;

                if (app.playerType === 'player') {
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

                    app.lightSprite.reset(app.game.camera.x, app.game.camera.y);
                    u.updateShadowTexture();

                    app.events.updateGame();
                }
            },

            updateShadowTexture: function() {
                // Draw shadow
                app.shadowTexture.context.fillStyle = 'rgb(10, 10, 10)';
                app.shadowTexture.context.fillRect(0, 0, app.game.width, app.game.height);
                var radius = 60 + app.game.rnd.integerInRange(1,10),

                heroX = app.assets.president.x,
                heroY = app.assets.president.y;

                // Draw circle of light with a soft edge
                var gradient = app.shadowTexture.context.createRadialGradient(heroX, heroY, 10 * 0.75,heroX, heroY, radius);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
                app.shadowTexture.context.beginPath();
                app.shadowTexture.context.fillStyle = gradient;
                app.shadowTexture.context.arc(heroX, heroY, radius, 0, Math.PI*2, false);
                app.shadowTexture.context.fill();
                // This just tells the engine it should update the texture cache
                app.shadowTexture.dirty = true;
            }

        };

        return u;
    };

    module.exports = update;
})();
