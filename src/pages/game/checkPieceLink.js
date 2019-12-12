// 检测右侧方位棋子是否能连成5子
export function checkRight(arr, rowIdx, colIdx, colMax) {
    let currentPiece = arr[rowIdx][colIdx].piece;
    if (!currentPiece) return;
    let count = 1;
    for (let i = colIdx + 1; i < colMax; i++) {
        if (currentPiece === arr[rowIdx][i].piece) {
            count++;
            if (count === 5) return true;
        } else {
            return false
        }
    }
}

// 检测右上棋子是否能连成5子
export function checkRightTop(arr, rowIdx, colIdx) {
    let currentPiece = arr[rowIdx][colIdx].piece;
    if (!currentPiece) return;
    let count = 1;
    let j = colIdx;
    for (let i = rowIdx - 1; i >= 0; i--) {
        j++;
        if (currentPiece === arr[i][j].piece) {
            count++;
            if (count === 5) return true;
        } else {
            return false
        }
    }
}

// 检测右下棋子是否能连成5子
export function checkRightBottom(arr, rowIdx, colIdx, rowMax) {
    let currentPiece = arr[rowIdx][colIdx].piece;
    if (!currentPiece) return;
    let count = 1;
    let j = colIdx;
    for (let i = rowIdx + 1; i < rowMax; i++) {
        j++;
        if (currentPiece === arr[i][j].piece) {
            count++;
            if (count === 5) return true;
        } else {
            return false
        }
    }
}

// 检测左侧棋子是否能连成5子
export function checkLeft(arr, rowIdx, colIdx) {
    let currentPiece = arr[rowIdx][colIdx].piece;
    if (!currentPiece) return;
    let count = 1;
    for (let i = colIdx - 1; i >= 0; i--) {
        if (currentPiece === arr[rowIdx][i].piece) {
            count++;
            if (count === 5) return true;
        } else {
            return false
        }
    }
}

// 检测左侧棋子是否能连成5子
export function checkLeftTop(arr, rowIdx, colIdx) {
    let currentPiece = arr[rowIdx][colIdx].piece;
    if (!currentPiece) return;
    let count = 1;
    let j = rowIdx;
    for (let i = colIdx - 1; i >= 0; i--) {
        j--;
        if (currentPiece === arr[j][i].piece) {
            count++;
            if (count === 5) return true;
        } else {
            return false
        }
    }
}

// 检测左侧棋子是否能连成5子
export function checkLeftBottom(arr, rowIdx, colIdx) {
    let currentPiece = arr[rowIdx][colIdx].piece;
    if (!currentPiece) return;
    let count = 1;
    let j = rowIdx;
    for (let i = colIdx - 1; i >= 0; i--) {
        j++;
        if (currentPiece === arr[j][i].piece) {
            count++;
            if (count === 5) return true;
        } else {
            return false
        }
    }
}

// 检测上方棋子是否能连成5子
export function checkTop(arr, rowIdx, colIdx) {
    let currentPiece = arr[rowIdx][colIdx].piece;
    if (!currentPiece) return;
    let count = 1;
    for (let i = rowIdx - 1; i >= 0; i--) {
        if (currentPiece === arr[i][colIdx].piece) {
            count++;
            if (count === 5) return true
        } else {
            return false
        }
    }
}

// 检测下方棋子是否能连成5子
export function checkBottom(arr, rowIdx, colIdx, rowMax) {
    let currentPiece = arr[rowIdx][colIdx].piece;
    if (!currentPiece) return;
    let count = 1;
    for (let i = rowIdx + 1; i < rowMax; i++) {
        if (currentPiece === arr[i][colIdx].piece) {
            count++;
            if (count === 5) return true
        } else {
            return false
        }
    }
}


export function checkAll(arr, rowIdx, colIdx, rowMax, colMax) {
    return (
        checkTop(arr, rowIdx, colIdx) ||
        checkRight(arr, rowIdx, colIdx, colMax) ||
        checkRightTop(arr, rowIdx, colIdx) ||
        checkRightBottom(arr, rowIdx, colIdx, rowMax) ||
        checkLeft(arr, rowIdx, colIdx) ||
        checkLeftTop(arr, rowIdx, colIdx) ||
        checkLeftBottom(arr, rowIdx, colIdx) ||
        checkBottom(arr, rowIdx, colIdx, rowMax)
    )
}



