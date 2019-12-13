import React, {useState, useEffect} from 'react';
import {findOnLineUsers, findAllUser} from "../../../service/game";
import {warning, success} from "../../../component/func/message";
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { Modal, Button } from 'antd';
import './userList.scss';

function getLevel(level) {
    switch (level) {
        case 0:
            return '初学者';
        case 1:
            return '能赢';
        case 2:
            return '还能赢';
        case 3:
            return '有点厉害';
        case 4:
            return '强啊';
        case 5:
            return '无敌！！';
        default:
            return '呵呵'
    }
}

function UserList({PVP, setPVP, userList, data, client, setStartGame}) {
    const [visible, setVisible] = useState(false);
    const [launchFromUser, setLaunchFromUser] = useState('');

    useEffect(() => {
        if (client) {
            // 接收到对面的挑战
            client.launchFrom(function (from) {
                setVisible(true);
                setLaunchFromUser(from);
            });
            // 监听对面是否接受的信息
            client.getLaunchInfo(function (isAccept) {
                if (isAccept) {
                    success('开打开打');
                    setStartGame(true);
                } else {
                    warning('对方拒绝了你，并向你呵呵')
                }
            })
        }
    }, [client]);
    // 发起挑战
    const handleInvitation = function (item) {
        if (!item.online) return warning('该玩家不在线');
        if (item.userName === data.userName) return warning('傻？自己和自己玩？');
        // 发起挑战
        client.launchTo(data.userName, item.userName);
    };
    // 拒绝后，发送拒绝的信息
    const handleCancel = function () {
        setVisible(false);
        client.acceptLaunch(false, launchFromUser);
        setLaunchFromUser(false);
    };
    // 同意接受挑战，发送同意的信息
    const handleOk = function () {
        setVisible(false);
        client.acceptLaunch(true, launchFromUser);
    };


    return (
        <div className="allUser">
            <Modal
                title="挑战帖"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>是否接受{launchFromUser}的挑战？</p>
            </Modal>
            <ul className="titleUl">
                <li>
                    <span>昵称</span>
                    <span>棋位</span>
                    <span>状态</span>
                    <span>游玩</span>
                </li>
            </ul>
            <ul>
                {
                    userList.map((item, index) => {
                        return (
                            <li key={index}>
                                <span className="nickname">
                                    {item.nickname}
                                </span>
                                <span className="level">
                                    {getLevel(item.level)}
                                </span>
                                <span className={`isOnline ${item.online ? 'online' : 'outline'}`}>
                                    <i className="iconfont icon-zaixian"/>
                                </span>
                                <span className={`${item.online ? 'lightColor' : 'invitation'}`} onClick={() => handleInvitation(item)}>
                                    邀请
                                </span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

const mapState = state => (
    {
        data: state.userName
    }
)

export default withRouter(connect(mapState)(UserList))
