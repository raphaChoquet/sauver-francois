'use strict';

const fs = require('fs');
const _ = require('lodash');

module.exports = function(app) {
    return {
        update: function(socket, infos) {
            app.socket.io.to(infos.room).emit('game.updateHelper', infos.updates);
        },

        win: function(socket, infos) {
            let filePaht = app.root + '/server/bdd/scores.json';
            let mapscore = infos.infos;

            app.socket.io.to(infos.room).emit('game.winHelper');

            fs.readFile(filePaht, 'utf8', function(err, d) {
                let data = JSON.parse(d);
                let mapI = _.findIndex(data, {map: mapscore.map});

                console.log(d);

                if (mapI < 0) {
                    data.push({map: mapscore.map, best: [mapscore.score]});
                }
                else {
                    data[mapI].best.push(mapscore.score);
                }

                let results = JSON.stringify(data);

                fs.writeFile(filePaht, results, 'utf8');
            });
        }
    }
}
