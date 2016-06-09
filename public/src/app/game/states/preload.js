(function() {
        'use strict';

    var preload = function(app) {

        var p = {

            init: function() {
                app.game.load.image('ball', '../img/game/ball.png');
                app.game.load.image('wall', '../img/game/wall.png');
                app.game.load.image('end', '../img/game/end.png');
                app.game.load.image('badGuy', '../img/game/wall.png');
                app.game.load.image('background', '../img/game/background.png');
            }

        }

        return p;
    };

    module.exports = preload;
})();
