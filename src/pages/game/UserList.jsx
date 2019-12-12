import React, {useState, useEffect} from 'react';
import {findOnLineUsers, findAllUser} from "../../service/game";
import {warning} from "../../component/func/message";
import {withRouter} from 'react-router-dom';
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

function UserList({history, userList}) {



    return (
        <div className="allUser">
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
                                <span className="isOnline">

                                </span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}


export default withRouter(UserList)
