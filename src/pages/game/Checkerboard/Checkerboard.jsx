import React, {useState, useEffect, useRef} from 'react';
import './checkerboard.scss';
import {
    checkRight,
    checkBottom,
    checkLeft,
    checkLeftBottom,
    checkLeftTop,
    checkRightBottom,
    checkRightTop,
    checkTop,
    checkAll
} from "./checkPieceLink";
import {connect} from 'react-redux';
import {success, warning} from "../../../component/func/message";

const black = 113;
const white = 112;
const rowMax = 15;
const colMax = 15;

function createCheckerboard() {
    const result = [];
    for (let i = 0; i < rowMax; i++) {
        const rowArr = [];
        for (let j = 0; j < colMax; j++) {
            rowArr.push({
                piece: ''
            })
        }
        result.push(rowArr);
    }
    return result
}

function changeRound(currentRoundPiece) {
    return currentRoundPiece === 'black' ? 'white' : 'black';
}

function isWin(rowIdx, colIdx, checkerboardArr) {
    console.log('rowIdx::', rowIdx);
    console.log('colIdx::', colIdx);
    // 边界问题
    // 如果棋子上方棋盘格数不足4格
    if (rowIdx < 4) {
        // 如果棋子左侧位置不足时，应只计算 right rightBottom
        if (colIdx < 4) {
            return (
                checkRight(checkerboardArr, rowIdx, colIdx, colMax) ||
                checkRightBottom(checkerboardArr, rowIdx, colIdx, rowMax)
            )
        }
        // 如果棋子右侧位置不足时，应只计算 left leftBottom
        else if (colIdx > 10) {
            return (
                checkLeft(checkerboardArr, rowIdx, colIdx) ||
                checkLeftBottom(checkerboardArr, rowIdx, colIdx)
            )
        }
        // 如果棋子左右位置都足够时，应计算 left leftBottom bottom right rightBottom
        else {
            return (
                checkLeft(checkerboardArr, rowIdx, colIdx) ||
                checkLeftBottom(checkerboardArr, rowIdx, colIdx) ||
                checkBottom(checkerboardArr, rowIdx, colIdx, rowMax) ||
                checkRight(checkerboardArr, rowIdx, colIdx, colMax) ||
                checkRightBottom(checkerboardArr, rowIdx, colIdx, rowMax)
            )
        }
    }
    // 如果棋子下方棋盘格数不足4格
    else if (rowIdx > 10) {
        // 如果棋子左侧位置不足时，应只计算 right rightTop
        if (colIdx < 4) {
            return (
                checkRight(checkerboardArr, rowIdx, colIdx, colMax) ||
                checkRightTop(checkerboardArr, rowIdx, colIdx)
            )
        }
        // 如果棋子右侧位置不足时，应只计算 left leftTop
        else if (colIdx > 10) {
            return (
                checkLeft(checkerboardArr, rowIdx, colIdx) ||
                checkLeftTop(checkerboardArr, rowIdx, colIdx)
            )
        }
        // 如果棋子左右位置都足够时，应计算 left leftTop top right rightTop
        else {
            return (
                checkLeft(checkerboardArr, rowIdx, colIdx) ||
                checkLeftTop(checkerboardArr, rowIdx, colIdx) ||
                checkRight(checkerboardArr, rowIdx, colIdx, colMax) ||
                checkRightTop(checkerboardArr, rowIdx, colIdx) ||
                checkTop(checkerboardArr, rowIdx, colIdx)
            )
        }
    }
    // 如果棋子上下方位置都足够时
    else {
        // 如果棋子左侧位置不足时，应只计算 right rightBottom top rightTop bottom
        if (colIdx < 4) {
            return (
                checkRight(checkerboardArr, rowIdx, colIdx, colMax) ||
                checkRightBottom(checkerboardArr, rowIdx, colIdx, rowMax) ||
                checkTop(checkerboardArr, rowIdx, colIdx) ||
                checkRightTop(checkerboardArr, rowIdx, colIdx) ||
                checkBottom(checkerboardArr, rowIdx, colIdx, rowMax)
            )
        }
        // 如果棋子右侧位置不足时，应只计算 left leftBottom bottom leftTop top
        else if (colIdx > 10) {
            return (
                checkLeft(checkerboardArr, rowIdx, colIdx) ||
                checkLeftTop(checkerboardArr, rowIdx, colIdx) ||
                checkBottom(checkerboardArr, rowIdx, colIdx, rowMax) ||
                checkTop(checkerboardArr, rowIdx, colIdx) ||
                checkLeftBottom(checkerboardArr, rowIdx, colIdx)

            )
        }
        // 如果棋子左右位置都足够时，应计算 left leftBottom leftTop bottom right rightBottom rightTop top
        else {
            return checkAll(checkerboardArr, rowIdx, colIdx, rowMax, colMax);
        }
    }
}

function Checkerboard({client, startGame, PVP, setPVP, data}) {

    const [checkerboardArr, setCheckerboardArr] = useState(createCheckerboard());
    const [currentRoundPiece, setCurrentRoundPiece] = useState('');
    const [currentRoundUser, setCurrentRoundUser] = useState('');
    const [hasWin, setHasWin] = useState('');

    useEffect(() => {
        if (client) {
            client.acceptPieces(function (data) {
                setCheckerboardArr([...data.cloneCheckerboardArr]);
                setCurrentRoundPiece(data.piece);

                if (data.result) {
                    setHasWin(PVP.vs.name);
                }
            })
        }
    }, [client]);

    useEffect(() => {
        if (hasWin) {
            success(`${hasWin}胜利！！`)
        }
    }, [hasWin]);

    useEffect(() => {
        if (startGame) {
            // 初始化棋盘
            initState();

        }
    }, [startGame]);

    useEffect(() => {
        if (currentRoundPiece && startGame) {
            console.log('改变 current 后，触发 set 方法', currentRoundPiece);
            // 设置当前回合的用户
            setCurrentRoundUser(getCurrentRoundUserName());
        }

    }, [currentRoundPiece]);

    const initState = function () {
        setCheckerboardArr(createCheckerboard());
        setCurrentRoundPiece('black');
        setHasWin('');
    };
    // 下棋
    const playChess = function (rowIdx, colIdx) {
        // 判断是否是该用户回合  如果不是则直接返回
        if (startGame && (currentRoundPiece !== PVP.self.piece)) return warning('没到你呢');

        const cloneCheckerboardArr = [...checkerboardArr];
        let currentObj = cloneCheckerboardArr[rowIdx][colIdx];
        if (currentObj.piece) return warning('这里已经有棋子了');
        currentObj.piece = currentRoundPiece;
        setCheckerboardArr(cloneCheckerboardArr);
        const result = isWin(rowIdx, colIdx, checkerboardArr);
        const piece = changeRound(currentRoundPiece);

        if (result) {

            if (startGame) {
                client.placingPieces({cloneCheckerboardArr, piece, result}, PVP.vs.name);
            }

            return setHasWin(data.userName || '');
        }

        setCurrentRoundPiece(piece);

        if (startGame) {
            // 发送落子数据
            client.placingPieces({cloneCheckerboardArr, piece, result}, PVP.vs.name);
        } else {
            setCurrentRoundUser(piece);
        }


    };
    // 获取当前回合的用户
    const getCurrentRoundUserName = function () {
        console.log('PVP::', PVP);
        if (currentRoundPiece === PVP.self.piece) return PVP.self.name;
        return PVP.vs.name;
    };

    return (
        <div className="checkerboard">

            <ul>
                {
                    checkerboardArr.map((row, index) => (
                        <li key={index} className="row">
                            <ul>
                                {
                                    row.map((col, idx) => (
                                        <li key={idx} className="col" onClick={() => {
                                            playChess(index, idx)
                                        }}>
                                            {
                                                col.piece === 'black'
                                                    ? <span className="blackPiece"/>
                                                    : col.piece === 'white'
                                                    ? <span className="whitePiece"/>
                                                    : ''
                                            }
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                    ))
                }
            </ul>
            <div className="currentPieceUserName">
                当前回合：{currentRoundUser}
            </div>
        </div>
    )
}

const mapState = state => ({
    data: state.userName
});

export default connect(mapState)(Checkerboard);


