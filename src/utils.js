import icon from './snake-icon.png';

export function find(list, i, j) {
    for (let [x, y] of list) {
        if (x === i && y === j) return true;
    }
    return false;
}

export function getNewHead(snakeHead, newX, newY) {
    let [headX, headY] = snakeHead;
    let [newHeadX, newHeadY] = [headX + newX, headY + newY];

    if (newHeadX < 0) newHeadX = rows - 1;
    if (newHeadY < 0) newHeadY = cols - 1;
    if (newHeadX >= rows) newHeadX = 0;
    if (newHeadY >= cols) newHeadY = 0;

    return [newHeadX, newHeadY];
}

export const rows = 20, cols = 35;

export const gameOverAlert = {
    title: `Game over! Your score is ${15}`,
    iconHtml: `<img src="${icon}">`,
    showCancelButton: true,
    confirmButtonText: 'Play again',
    cancelButtonText: 'Cancel',
    background: 'black',
    color: 'white',
    customClass: {

    }
};