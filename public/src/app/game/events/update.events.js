(function() {
    'use strict';

    var events = function(app) {

        var e = {

            /**
             * End of the level
             */
            levelEnd: function() {
                var h = document.getElementById('background-hollande');

                h.style.display = 'block';
                app.game.world.removeAll();
                app.states.create();

                setTimeout(function() { h.style.display = 'none'; }, 1000);
            },

            /**
             * Restart the game
             */
            restartGame: function() {
                app.game.world.removeAll();
                app.states.create();
            }

        };

        return e;

    };

    module.exports = events;
})();
