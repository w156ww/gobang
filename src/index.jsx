import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import {Provider} from 'react-redux';
import store from './store/index';

// font
import './asset/font/iconfont.css';
// css reset
import './asset/style/reset.scss';
import 'antd/dist/antd.css';
// websocket
import './socket/index';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
