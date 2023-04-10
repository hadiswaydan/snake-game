import moveSoundSrc from './assets/move.mp3';
import eatSoundSrc from './assets/eat.mp3';
import dieSoundSrc from './assets/die.mp3';
import { Howl } from 'howler';

export const rows = 13, cols = 17;

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

export function isSnakeHead(snake, i, j) {
    return snake[0][0] === i && snake[0][1] === j;
}


export const moveSound = new Howl({
    src: moveSoundSrc,
    autoplay: false,
});

export const eatSound = new Howl({
    src: eatSoundSrc,
    autoplay: false,
})

export const dieSound = new Howl({
    src: dieSoundSrc,
    autoplay: false,
});

