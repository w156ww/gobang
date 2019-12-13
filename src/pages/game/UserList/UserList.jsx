import React, {useState, useEffect} from 'react';
import {findOnLineUsers, findAllUser} from "../../../service/game";
import {warning} from "../../../component/func/message";
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

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
            return '无敌！！'
    }
}

function UserList({history, userList, data}) {

    const handleInvitation = function (item) {
        console.log('item', item);
        console.log('data', data);
        if (!item.online) return warning('该玩家不在线');
        if (item.userName === data.userName) return warning('傻？自己和自己玩？');
    };


    return (
        <div className="allUser">
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
