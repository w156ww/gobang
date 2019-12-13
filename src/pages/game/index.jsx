import React, {useEffect, useState, useCallback} from 'react';
import Checkerboard from "./Checkerboard/Checkerboard";
import Menu from "./Menu/Menu";
import UserList from "./UserList/UserList";
import './index.scss'
import {withRouter} from 'react-router-dom'

import createSocket from '../../socket/index';
import {findAllUser} from "../../service/game";
import {warning, error} from "../../component/func/message";
import {USER_TOKEN} from "../../config/identify-token";


function Game({history}) {

    const [client, setClient] = useState(null);
    const [userList, setUserList] = useState([]);
    const [PVP, serPVP] = useState({});

    const getAllUser = function() {
        return new Promise((resolve, reject) => {
            findAllUser().then(res => {
                const data = res.data.data;
                if (res.data.code === 603) {
                    warning('登录已过期，请重新登录');
                    return history.push('/login')
                }
                if (data && data.length) {
                    setUserList(data);
                    resolve();
                }
            }).catch(err => {
                warning('连接失败，正在尝试重试，请耐心等待');
                getAllUser();
                reject();
            })
        })
    };

    useEffect(() => {

        setClient(createSocket())

    }, []);

    useEffect(() => {
        if (client) {
            const userToken = localStorage.getItem(USER_TOKEN);

            client.listenError(function (msg) {
                error(msg);
            });

            client.socket.on('getUserStatus', function () {
                getAllUser();
            });

            client.socket.on('loginExpire', function () {
                warning('登录已过期，请重新登录');
                history.push('/login')
            });

            client.sendUserInfo({userName: userToken});
        }
    }, [client]);

    return (
        <div className="game">
            <div className="container">
                <Checkerboard />
                <Menu {...client} />
            </div>
            <div className="userList">
                <UserList userList={userList} />
            </div>

        </div>
    )
}



export default withRouter(Game);
