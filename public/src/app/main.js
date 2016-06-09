
var socket = io.connect();
var webrtc = null;

async.parallel([
	async.apply(initWebRTC),
	async.apply(initRoom)
], launchCall);

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
	var room = 'foo';

	if (room !== '') {
	  socket.emit('create or join', room);
	  console.log('Attempted to create or  join room', room);
	}
	socket.on('full', function(room) {
	  console.log('Room ' + room + ' is full');
	});

	socket.on('joined', function(room) {
	  console.log('joined: ' + room);
	  callback(room);
	});
}

function launchCall(results) {
	webrtc.startLocalVideo();
	webrtc.joinRoom(results);
}

socket.on('log', function(array) {
  console.log.apply(console, array);
});

socket.on('rooms', function(rooms) {
	console.log(rooms);
	for (var key in rooms) {

		$('#room-list').append('<li>Room ' + key + ' : ' + rooms[key].length + ' joueur(s)</li>');
	}


});
