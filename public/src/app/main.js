var game = require('./game/game');
var socket = io.connect();
var webrtc = null;
var room  = '';
var playerType = null;

function start() {
    async.parallel([
        async.apply(initWebRTC),
        async.apply(initRoom)
    ], launchCall);
}

function initWebRTC (callback) {
    webrtc = new SimpleWebRTC({
        localVideoEl: 'localVideo',
        remoteVideosEl: 'remotesVideos',
        autoRequestMedia: false
    });

    webrtc.on('readyToCall', function () {
        callback();
    });
}

function initRoom(callback) {
    if (room !== '') {
      socket.emit('create or join', room);
      console.log('Attempted to create or  join room', room);
    }
    socket.on('full', function(room) {
      console.log('Room ' + room + ' is full');
    });

    socket.on('joined', function(info, socket, _playerType) {
		playerType = _playerType;
		callback(room);
	});
}

function launchCall(results) {
    webrtc.startLocalVideo();
    webrtc.joinRoom(results, function (err, roomDescription) {
        var size = Object.keys(roomDescription.clients).length;
        if (size > 1) {
                webrtc.stopLocalVideo();
                webrtc.leaveRoom();
                alert('Room already used !');
        }
        else {
            $('#page-game').show();
            $('#page-intro').hide();
            game.init(playerType, socket);
        }
    });
}

socket.on('log', function(array) {
  console.log.apply(console, array);
});

socket.on('retrieve rooms', function(rooms) {
    console.log(rooms);
    for (var key in rooms) {
        $('#room-list').append('<li>Room ' + key + ' : ' + rooms[key].length + ' joueur(s)</li><button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent join-room" data-room="'+ key +'">Join room</button>');
    }
    $(".join-room").click(join);
});

$(function(){
    $('#page-game').hide();
    $('#page-intro').show();
    $('#create-room').click(create);
    socket.emit('get rooms', {});
});

function create(){
    var room_name = $('#sample1').val();
    room = room_name;
    start();
};

function join(){
    console.log('join');
    room = $(this).data('room');
    start();
};


//
