const socketIO = require('socket.io');

module.exports = function (app) {
  return {
    io: null,

    init: function () {
      this.io = socketIO(app.server.instance);
      this.listen();
    },

    listen: function () {
      this.io.on('connection', function (socket) {
        console.log('User connected');

        var events = app.config.events;

        for (var i = 0; i < events.length; i++) {
          var ev = events[i];
          var service = ev.method.split("::")[0];
          var method = ev.method.split("::")[1];
          socket.on(ev.listener, app[service][method]);
        }
      });
    }
  };
};
