import React, {useState} from 'react';
import {withRouter} from 'react-router-dom'
import './index.scss';
import '../common.scss';
import {Button, Input} from "antd";
import {register} from "../../../service/account";
import {error, success} from "../../../component/func/message";

function Register({history}) {
    const [userName, setUserName] = useState('');
    const [nickname, setNickname] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const changeValue = function(e) {
        setUserName(e.target.value);
    };

    const changeNick = function (e) {
        setNickname(e.target.value);
    };

    const handleConfirm = function () {
        setIsLoading(true);
        register({userName, nickname}).then(res => {
            setIsLoading(false);
            const data = res.data.data;
            if (data.status === 1) {
                success('注册成功，2s后自动跳转登录页面');
                setTimeout(() =>{
                    history.push('/login')
                }, 2000)
            } else {
                error(data.message)
            }
        }).catch(err => {
            error(err.message, 0);
            setIsLoading(false);
        })
    };

    return (
        <div className="register">
            <div className="wrapper">
                <div className="ipt">
                    <Input addonBefore="你的口令" value={userName} onChange={changeValue} />
                    <Input addonBefore="昵称" value={nickname} onChange={changeNick} />
                </div>
                <div className="confirm">
                    <Button onClick={handleConfirm} loading={isLoading}>确定</Button>
                </div>
            </div>
        </div>
    )
}


export default withRouter(Register)
