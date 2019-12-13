import {SET_SOCKET_CLIENT, GET_SOCKET_CLIENT} from "./action-types";

const initSocketClient = {};


export const socketClient = function (state = initSocketClient, action) {
    switch (action.type) {
        case SET_SOCKET_CLIENT:
            return {
                ...action.payload
            };
        case GET_SOCKET_CLIENT:
            return state;
        default:
            return state
    }
};


