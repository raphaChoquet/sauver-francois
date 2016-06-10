(function() {
    'use strict';

    var create = function(app) {

            var c = {
                startPosition: {x: 0, y: 0},
                endPosition: {x: 0, y: 0},

                /**
                 * Init the creation of the game
                 */
                init: function() {
                    var _a = app.assets;
                    var bg = app.game.add.group();

                    app.game.physics.startSystem(Phaser.Physics.ARCADE);

                    app.assets.winSong = app.game.add.audio('win-song');

                    // Bad Guys group init
                    _a.badGuys = app.game.add.physicsGroup(Phaser.Physics.ARCADE);
                    _a.badGuys.enableBody = true;

                    // Walls group init
                    _a.walls = app.game.add.physicsGroup();
                    _a.walls.enableBody = true;

                    var map = Math.random() > 0.6 ? app.maps[1] : app.maps[0];

                    _createMap(map, bg);

                    _a.president = app.game.add.sprite(c.startPosition.x, c.startPosition.y, 'ball');
                    app.game.physics.arcade.enable(_a.president);
                    _a.president.body.collideWorldBounds = true;
                    _a.president.body.setSize(32, 32, 0, 0);

                    // Arrival
                    _a.arrival = app.game.add.sprite(c.endPosition.x, c.endPosition.y, 'end');
                    app.game.physics.arcade.enable(_a.arrival);
                    _a.arrival.body.imovable = true;
                    _a.arrival.physicsBodyType = Phaser.Physics.ARCADE;


                    // SHADOW PLAYER
                    if(app.playerType === 'player') {
                        app.shadowTexture = app.game.add.bitmapData(app.game.width, app.game.height);
                        app.lightSprite = app.game.add.image(app.game.camera.x, app.game.camera.y, app.shadowTexture);
                        app.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
                    }


                    app.cursors = app.game.input.keyboard.createCursorKeys();

                    if (app.playerType === 'helper') {
                        app.events.updateHelper();
                    }
                }

            };

            return c;

            /**
             * @private
             * Create the map with all assets
             *
             * @param {Array} map
             * @param {Object} bg
             */
            function _createMap(map, bg) {
                var _a = app.assets;
                var pos = { x: 0, y: 0 };
                var incr = 48;

                for (var i = 0; i < map.length; i++) {

                    var line = map[i];

                    for (var j = 0; j < line.length; j++) {
                        var b = bg.create(pos.x, pos.y, 'background');

                        var sub = line[j];

                        if (sub === 1) {
                            var wall = _a.walls.create(pos.x, pos.y, 'wall');
                            app.game.physics.enable(wall, Phaser.Physics.ARCADE);
                            wall.body.collideWorldBounds = true;
                            wall.body.immovable = true;
                        }

                        if (sub === 2) {
                            c.startPosition = {x: pos.x, y: pos.y};
                        }

                        if (sub === 3) {
                            c.endPosition = {x: pos.x, y: pos.y};
                        }

                        if (sub === 4) {
                            var b = _a.badGuys.create(pos.x, pos.y, 'badGuy');
                            b.body.collideWorldBounds = true;

                            if (app.playerType === 'player') {
                                b.body.velocity.set(app.game.rnd.integerInRange(0, 300), app.game.rnd.integerInRange(0, 300));
                                b.body.bounce.x = 1;
                                b.body.bounce.y = 1;
                            }
                        }

                        pos.x += incr;
                    }

                    pos.y += incr;
                    pos.x = 0;
                }
            };
    };

    module.exports = create;
})();
