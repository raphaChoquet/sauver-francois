const express = require('express');
const http = require('http');

module.exports = function(app) {

    return {
        instance: null,
        express: null,

        /// FUNCTION ///
        create: function() {
            this.express = express();
            this.instance = http.Server(this.express);
            app.routes.create();
            if (app.config.socket) {
                app.socket.init();
            }
            this.listen();
        },

        listen: function() {
            this.instance.listen(app.config.port, function() {
                console.log('Server listening on *:' + app.config.port);
            });
        }
    };
};
