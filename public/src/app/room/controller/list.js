(function() {
    'use strict';

    var list = function(app) {

        var l = {};
        var $container = null;

        l.init = function() {
            $container = $('#room-list');
            $container.on('click', '.join-room', l.join);
        };

        l.join = function() {
            var roomName = $(this).parent().data('room');
            app.join(roomName);
        };

        l.generateList = function(rooms) {
            app.rooms = rooms;
            var html = "";
            for (var key in app.rooms) {
                html += buildItem(key, app.rooms[key].length);
            }
            $container.empty().append(html);
        };

        l.addItem = function(roomName, userId, playerType) {
            var roomsName = Object.keys(app.rooms);
            if (roomsName.indexOf(roomName) !== -1) {
                return;
            }
            app.rooms[roomName] = [{
                id: userId,
                player: playerType
            }];
            var html = buildItem(roomName, 1);
            $container.append(html);
        };

        l.disableRoom = function(roomName, userId, playerType) {
            var roomsName = Object.keys(app.rooms);
            if (roomsName.indexOf(roomName) === -1) {
                return;
            }

            app.rooms[roomName].push({
                id: userId,
                player: playerType
            });
            updateItem(roomName, 2);;
        };

        l.enableRoom = function(room, userId) {
            var isFind = false;
            for (var i = 0; i < app.rooms[room].length && !isFind; i++) {
                var _r = app.rooms[room][i];
                if (_r.id === userId) {
                    app.rooms[room].splice(i, 1);
                    isFind = true;
                }
            }
            updateItem(room, 1);
        };

        l.deleteRoom = function(room) {
            delete app.rooms[room];
            $('li[data-room="' + room + '"]').remove();
        };

        return l;

        function buildItem(room, nbrPlayer) {
            var html = '<li data-room="' + room + '">';

            html += 'Salon ' + room + ' : <span class="nbrPlayer">' + nbrPlayer + " joueur" + (nbrPlayer > 1 ? 's' : '') + '</span>';
            if (nbrPlayer < 2) {
                html += '<button class="waves-effect waves-light btn join-room">Rejoindre salon</button>';
            }
            html += '</li>';

            return html;
        }

        function updateItem(room, nbrPlayer) {
            var $item = $('li[data-room="' + room + '"]');

            $item.find('.nbrPlayer').text(nbrPlayer + " joueur" + (nbrPlayer > 1 ? 's' : ''));
            if (nbrPlayer >= 2 && $item.find('.join-room').length > 0) {
                $item.find('.join-room').remove();
            } else if (nbrPlayer < 2 && $item.find('.join-room').length === 0) {
                $item.append('<button class="waves-effect waves-light btn join-room">Rejoindre salon</button>');
            }
        }
    };

    module.exports = list;
})();
