import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {Input, Button, message} from "antd";
import {login} from "../../../service/account";
import {error} from "../../../component/func/message";


import './index.scss';
import '../common.scss';


function Login({history}) {
    const [userName, setUserName] = useState('');

    function changeValue(e) {
        setUserName(e.target.value);
    }

    const handleConfirm = function() {

        login({userName}).then(res => {

            const data = res.data.data;

            if (data.status === 2) {

                error(data.message);

            } else if (data.status === 1) {

                localStorage.setItem('user-token', data.TOKEN);

                window.userName = data.TOKEN;

                history.push('/game');
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const handleRegister = function () {
        history.push('/register');
    };


    return (
        <div className="login">
            <div className="wrapper">
                <div className="ipt">
                    <Input addonBefore="你的口令" value={userName} onChange={changeValue} />
                </div>
                <div className="confirm">
                    <Button onClick={handleConfirm}>确定</Button>
                    <Button onClick={handleRegister}>注册</Button>
                </div>
            </div>
        </div>
    )
}


export default withRouter(Login);
