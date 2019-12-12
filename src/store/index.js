import {createStore} from "redux";
import reducer from './reducers/index'



/* eslint-disable no-underscore-dangle */
export default createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // 用于 redux devtool 工具调试
)
/* eslint-enable */
