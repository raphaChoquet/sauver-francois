const express = require('express');

module.exports = function (app) {
  return {
    create: function() {
      if (app.config.routes.dynamic.length > 0) {
        this.createDynamic();
      }
      if (app.config.routes.static.length > 0) {
        this.createStatic();
      }
    },

    createDynamic: function () {
      var routes = app.config.routes.dynamic;
      for (var i = 0; i < routes.length; i++) {
        (function (_r) {
          app.server.express.get(_r.path, function (req, res) {
            res.sendFile(app.root + '/public/views/' + _r.view + '.html');
          });
        }) (routes[i]);
      }
    },

    createStatic: function () {
      var routes = app.config.routes.static;
      for (var i = 0; i < routes.length; i++) {
        (function (_r) {
          app.server.express.use(_r.path, express.static(app.root + '/public/' + _r.folder));
        }) (routes[i]);
      }
    }

  };
};
