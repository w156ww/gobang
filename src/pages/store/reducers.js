import {GET_USER_NAME, SET_USER_NAME} from "./action-types";
const initUserName = {};

export const getUserName = function (state = initUserName, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case GET_USER_NAME:
            return state;
        case SET_USER_NAME:
            return {
                ...action.data
            };
        default:
            return state
    }
};

