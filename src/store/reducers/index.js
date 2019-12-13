import {combineReducers} from "redux";
import common from './common-reducers'
import {getUserName} from "../../pages/store/reducers";

export default combineReducers({
    common,
    userName: getUserName
})
