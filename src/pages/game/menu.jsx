import React from 'react';
import {Button} from "antd";
import './menu.scss';


function Menu({restart}) {

    const handleRestart = function () {
        restart('restart')
    };

    return (
        <div className="menu">
            <Button size="large" onClick={handleRestart}>重开</Button>
            <Button size="large">悔棋</Button>
            <Button size="large" type="danger">认输</Button>
        </div>
    )
}


export default Menu;
