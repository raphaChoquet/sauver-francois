(function() {
        'use strict';

    var preload = function(app) {

        var p = {

            init: function() {
                app.game.load.image('ball', '../img/game/ball.png');
                app.game.load.image('wall', '../img/game/wall.png');
                app.game.load.image('end', '../img/game/end.png');
                app.game.load.image('badGuy', '../img/game/bad-guys.png');
                app.game.load.image('background', '../img/game/background.png');
                app.game.load.image('background-mask', '../img/game/background-mask.png');

                app.game.load.audio('win-song', ['../img/usher.ogg']);
            }

        }

        return p;
    };

    module.exports = preload;
})();
