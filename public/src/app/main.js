var game = require('./game/game');
var room = require('./room/room');
var socket = io.connect();
var webrtc = null;

$(function () {
    $('#page-game').hide();
    $('#page-intro').show();
    room.init(socket, initWebRTC);
});

function initWebRTC() {
    webrtc = new SimpleWebRTC({
        localVideoEl: 'localVideo',
        remoteVideosEl: 'remotesVideos',
        autoRequestMedia: true
    });

    webrtc.on('readyToCall', function() {
        launchGame();
    });
}

function launchGame() {
    webrtc.joinRoom(room.myRoom, function(err, roomDescription) {
        var size = Object.keys(roomDescription.clients).length;
        if (size > 1) {
            webrtc.stopLocalVideo();
            webrtc.leaveRoom();
            alert('Room already used !');
        } else {
            $('#page-game').show();
            $('#page-intro').hide();
            game.init(room.playerType, room.myRoom, socket);
        }
    });
}
