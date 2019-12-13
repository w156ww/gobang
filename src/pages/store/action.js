import {GET_USER_NAME, SET_USER_NAME} from "./action-types";

const getUserName = () => ({
    type: GET_USER_NAME
});

const serUserName = data => ({
    type: SET_USER_NAME,
    data
});

export {
    getUserName,
    serUserName
}
