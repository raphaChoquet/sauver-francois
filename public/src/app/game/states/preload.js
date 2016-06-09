(function() {
        'use strict';

    var preload = function(app) {

        var p = {

            init: function() {
                app.game.load.image('ball', 'assets/ball.png');
                app.game.load.image('wall', 'assets/wall.png');
                app.game.load.image('end', 'assets/end.png');
                app.game.load.image('badGuy', 'assets/wall.png');
                app.game.load.image('background', 'assets/background.png');
            }

        }

        return p;
    };

    module.exports = preload;
})();
