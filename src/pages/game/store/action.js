import {SET_SOCKET_CLIENT, GET_SOCKET_CLIENT} from "./action-types";



const setSocketClient = socketClient => ({
    type: SET_SOCKET_CLIENT,
    payload: {
        socketClient
    }
});

const getSocketClient = () => ({
    type: GET_SOCKET_CLIENT,
});

export {
    setSocketClient,
    getSocketClient,
}
