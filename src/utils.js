import moveSoundSrc from './assets/move.mp3';
import eatSoundSrc from './assets/eat.mp3';
import dieSoundSrc from './assets/die.mp3';
import { Howl } from 'howler';
import { useEffect, useRef } from 'react';

export const rows = 13, cols = 17;

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

export function find(list, i, j) {
    for (let [x, y] of list) {
        if (x === i && y === j) return true;
    }
    return false;
}

export function getNewHead(snakeHead, direction) {
    let newX = 0, newY = 0;
    switch (direction) {
        case 0:
            newY = -1;
            break;
        case 1:
            newX = -1;
            break;
        case 2:
            newY = 1;
            break;
        case 3:
            newX = 1;
            break;
    }
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

export function getDirectionFromKey(key) {
    let newDir;
    switch (key) {
        case 'a':
        case 'A':
        case 'ArrowLeft':
            newDir = 0;
            break;
        case 'w':
        case 'W':
        case 'ArrowUp':
            newDir = 1;
            break;
        case 'd':
        case 'D':
        case 'ArrowRight':
            newDir = 2;
            break;
        case 's':
        case 'S':
        case 'ArrowDown':
            newDir = 3;
            break;
        default:
            newDir = '';
    }
    return newDir;
}


export function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

