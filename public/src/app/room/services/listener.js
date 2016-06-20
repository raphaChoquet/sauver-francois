(function() {
    'use strict';

    var listener = function(app) {


        var events = {
            'room.created': [app.readyToLaunch, app.list.addItem],
            'room.joined': [app.readyToLaunch, app.list.disableRoom],
            'room.available': [app.list.enableRoom],
            'room.deleted': [app.list.deleteRoom],
            'room.retrieved': [app.list.generateList],
            'room.exist': [],
            'room.dont-exist': [],
            'room.full': []
        };

        var l = {};

        l.listen = function() {
            for (var _ev in events) {
                app.socket.on(_ev, (function(_ev) {
                    return function() {
                        if (events[_ev].length !== 0) {
                            _handleCallback(_ev, arguments);
                        }
                    };
                })(_ev));
            }
        };

        return l;

        function _handleCallback(_ev, parameters) {
            async.each(events[_ev], function(method, callback) {
                if (typeof method === 'function') {
                    method.apply(this, parameters);
                    callback();
                } else {
                    callback('It\'s not a correct function.');
                }
            }, function(err) {
                if (err) {
                    console.log(err);
                }
            });
        };
    };

    module.exports = listener;
})();
