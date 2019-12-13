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

function changeRound(currentRound) {
    return currentRound === 'black' ? 'white' : 'black';
}

function playChess(rowIdx, colIdx, {checkerboardArr, setCheckerboardArr, currentRound, setCurrentRound, hasWin, setHasWin}) {
    const cloneCheckerboardArr = [...checkerboardArr];
    let currentObj = cloneCheckerboardArr[rowIdx][colIdx];
    if (currentObj.piece) return;
    currentObj.piece = currentRound;
    setCheckerboardArr(cloneCheckerboardArr);
    const result = isWin(rowIdx, colIdx, checkerboardArr);
    console.log('result::', result);
    if (result) {
        return setHasWin(true);
    }

    setCurrentRound(changeRound(currentRound));
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

function Checkerboard() {

    const [checkerboardArr, setCheckerboardArr] = useState(createCheckerboard());
    const [currentRound, setCurrentRound] = useState('black');
    const [hasWin, setHasWin] = useState(false);

    useEffect(() => {
        if (hasWin) {
            alert(`${currentRound} 方获得胜利`)
        }
    }, [currentRound, hasWin]);

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
                                            playChess(index, idx, {
                                                checkerboardArr,
                                                setCheckerboardArr,
                                                currentRound,
                                                setCurrentRound,
                                                hasWin,
                                                setHasWin
                                            })
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
        </div>
    )
}


export default Checkerboard;


