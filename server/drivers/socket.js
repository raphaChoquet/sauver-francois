const socketIO = require('socket.io');

module.exports = function (app) {
  return {
    io: null,

    /// FUNCTION ///
    init: function () {
      this.io = socketIO(app.server.instance);
      this.listen();
    },

    listen: function () {
      this.io.on('connection', function (socket) {

        console.log('User connected');
        socket.on('disconnect', function(){
          app.socket.disconnect(socket);
        });
        app.socket.log = function () {
          if (!app.config.debug) {
            return;
          }
          var array = ['Message from server:'];
          array.push.apply(array, arguments);
          socket.emit('log', array);
        };

        var events = app.config.events;

        for (var i = 0; i < events.length; i++) {
          var ev = events[i];

          socket.on(ev.listener, (function (ev) {
              var service = ev.method.split("::")[0];
              var method = ev.method.split("::")[1];
              return function (data) {
                app[service][method](socket, data);
              };
          }) (ev));
        }
      });
    },
    disconnect: function(socket){
      app.room.leave(socket.id);
    }

  };

};
