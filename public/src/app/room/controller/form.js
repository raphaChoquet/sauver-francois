(function() {
    'use strict';

    var form = function(app) {

        var f = {};
        $('#create-room').click(submit);

        return f;

        function submit() {
            var roomName = $('#room-name').val();
            if (roomName === "") {
                return;
            } else if (app.rooms[roomName]) {
                if (app.rooms[roomName].length >= 2) {
                    alert('Salle compléte!');
                } else {
                    app.join(roomName);
                }
            } else {
                app.create(roomName);
            }
        }
    };

    module.exports = form;
})();
