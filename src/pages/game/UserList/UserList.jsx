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

function UserList({setPVP, userList, data, client, setStartGame}) {
    const [visible, setVisible] = useState(false);
    const [opponent, setOpponent] = useState(''); // 对手

    useEffect(() => {
        if (client) {
            // 接收到对面的挑战
            client.launchFrom(function (from) {
                setVisible(true);
                setOpponent(from);
            });
            // 监听对面是否接受的信息
            client.getLaunchInfo(function (isAccept, from) {
                if (isAccept) {
                    success('开打开打');
                    setPVP({
                        self: {
                            name: data.userName,
                            challenger: true,
                            piece: 'white'
                        },
                        vs: {
                            name: from,
                            challenger: false,
                            piece: 'black'
                        }
                    });
                    setStartGame(true);
                } else {
                    setOpponent(''); // 拒绝后，删除对手的 userName
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
        setOpponent(item.userName); // 记录对手的 userName
    };

    // 拒绝后，发送拒绝的信息
    const handleCancel = function () {
        setVisible(false);
        client.acceptLaunch(false, data.userName, opponent);
        setOpponent('');
    };
    // 同意接受挑战，发送同意的信息
    const handleOk = function () {
        setVisible(false);
        setPVP({
            self: {
                name: data.userName,
                challenger: false,
                piece: 'black'
            },
            vs: {
                name: opponent,
                challenger: true,
                piece: 'white'
            }
        });
        setStartGame(true);
        client.acceptLaunch(true, data.userName, opponent);
    };


    return (
        <div className="allUser">
            <Modal
                title="挑战帖"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>是否接受{opponent}的挑战？</p>
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
