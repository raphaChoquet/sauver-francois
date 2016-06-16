const socketIO = require('socket.io');

module.exports = function(app) {
    return {
        io: null,

        /// FUNCTION ///
        init: function() {
            this.io = socketIO(app.server.instance);
            this.listen();
        },

        listen: function() {
            this.io.on('connection', function(socket) {

                console.log('User connected');
                socket.on('disconnect', function() {
                    app.socket.disconnect(socket);
                });
                app.socket.log = function() {
                    if (!app.config.debug) {
                        return;
                    }
                    var array = ['Message from server:'];
                    array.push.apply(array, arguments);
                    socket.emit('log', array);
                };

                var events = app.config.events;

                for (var i = 0; i < events.length; i++) {
                    socket.on(events[i].listener, (function(ev) {

                        return function(data) {
                            var service = ev.method.split("::")[0];
                            var method = ev.method.split("::")[1];
                            app[service][method](socket, data);
                        };
                    })(events[i]));
                }
            });
        },
        disconnect: function(socket) {
            var callbacks = app.config.disconnectEvents;
            for (var i = 0; i < callbacks.length; i++) {
                var service = callbacks[i].split('::')[0];
                var method = callbacks[i].split('::')[1];
                app[service][method](socket);
            }

        }

    };

};
