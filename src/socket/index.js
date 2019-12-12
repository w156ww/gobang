const io = require('socket.io-client');


export default function () {
    const socket = io.connect('172.16.60.72:3111');

    function listenError(cb) {
        socket.on('error', cb);
    }

    function sendUserInfo(data) {
        socket.emit('userInfo', data)
    }

    function restart(data) {
        socket.emit('restart', data);
    }

    return {
        sendUserInfo,
        restart,
        socket,
        listenError
    }
}








