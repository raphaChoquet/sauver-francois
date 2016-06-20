(function() {
    'use strict';

    var timer = function(app) {

        var t = {

            realCount: 0,
            count: 0,
            module: null,
            text: null,

            create: function() {
                if (t.module !== null) t.module.destroy();

                t.module = app.game.time.create(false);
                t.module.loop(100, function() { t.realCount += 0.1; t.count = t.realCount.toFixed(2) }, this);
            },

            start: function() {
                t.module.start();
            },

            show: function() {
                var style = { font: "16px Arial", fill: "#ffffff", wordWrap: true, align: "right" };

                t.text = app.game.add.text((app.game.width - 50), 20, t.count, style);
            },

            update: function() {
                t.text.setText(t.count);
            },

            reset: function() {
                t.realCount = 0;
            },

            getTime: function() {
                return t.count;
            }

        };

        return t;

    };

    module.exports = timer;
})();
