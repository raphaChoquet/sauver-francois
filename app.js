const config = require('config');

var app = {
    root: __dirname,
    config: config
};

app.server = require('./server/drivers/server')(app);
app.routes = require('./server/drivers/routes')(app);
app.socket = require('./server/drivers/socket')(app);

app.room = require('./server/services/room')(app);
app.game = require('./server/services/game')(app);

app.server.create();
