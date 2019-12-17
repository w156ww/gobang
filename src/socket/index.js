import {warning} from "../component/func/message";

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

    function getUserStatus(cb) {
        socket.on('getUserStatus', cb);
    }

    function loginExpire(cb) {
        socket.on('loginExpire', cb);
    }
    // 发起挑战
    function launchTo(from, to) {
        socket.emit('launchTo', from, to);
    }
    // 接收挑战信息
    function launchFrom(cb) {
        socket.on('launchFrom', cb);
    }
    // 接受挑战
    function acceptLaunch(data, from, to) {
        socket.emit('acceptLaunch', data, from, to)
    }
    // 监听接受挑战信息
    function getLaunchInfo(cb) {
        socket.on('get launch info', cb);
    }
    // 落子位置数据
    function placingPieces(data, to) {
        socket.emit('placingPieces', data, to);
    }
    // 接收落子位置
    function acceptPieces(cb) {
        socket.on('acceptPieces', cb);
    }

    return {
        sendUserInfo,
        launchTo,
        acceptLaunch,
        restart,
        placingPieces,


        socket,
        listenError,
        loginExpire,
        getUserStatus,
        launchFrom,
        getLaunchInfo,
        acceptPieces,

    }
}








