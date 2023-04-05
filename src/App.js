import React, { useEffect, useState } from 'react'
import './App.css';
import Swal from 'sweetalert2';

import { find, getNewHead, rows, cols, gameOverAlert } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { generateFood } from './reducers/foodReducer';
import { resetIntervalId, run, setDirection, setIntervalId, stop } from './reducers/gameReducer';
import { setSnakePosition } from './reducers/snakeReducer';

export default function App() {

    const dispatch = useDispatch();
    const direction = useSelector(state => state.game.direction);
    const intervalId = useSelector(state => state.game.intervalId);
    const running = useSelector(state => state.game.running);
    const food = useSelector(state => state.food.position);
    const [snake, setSnake] = useState([[10, 15], [10, 16], [10, 17]]);
    let newX = 0, newY = 0, clicking = false;


    const move = () => {
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
        let [headX, headY] = snake[0];
        let [newHeadX, newHeadY] = [headX + newX, headY + newY];

        if (newHeadX < 0) newHeadX = rows - 1;
        if (newHeadY < 0) newHeadY = cols - 1;
        if (newHeadX >= rows) newHeadX = 0;
        if (newHeadY >= cols) newHeadY = 0;

        setSnake([...snake]);
    }

    const setupButtons = (e) => {
        if (clicking) return;
        clicking = true;
        setTimeout(() => clicking = false, 1);
        switch (e.key) {
            case 'a':
                dispatch(setDirection(0));
                break;
            case 'w':
                dispatch(setDirection(1));
                break;
            case 'd':
                dispatch(setDirection(2));
                break;
            case 's':
                dispatch(setDirection(3));
                break;
        }
    };
    const gameOver = () => {
        dispatch(stop());
        Swal.fire(gameOverAlert);
    }

    const play = () => {
        const id = setInterval(() => {
            move();
        }, 200);
        dispatch(setIntervalId(id));
    }

    useEffect(() => {
        window.addEventListener("keydown", setupButtons);
        dispatch(generateFood(snake));
    }, []);


    useEffect(() => {
        if (intervalId) {
            clearInterval(intervalId);
            dispatch(resetIntervalId());
            if (running) move();
        }
        if (running) play();

    }, [direction, running]);


    return (
        <>
            <button className='stop' onClick={() => {
                if (running) dispatch(stop());
                else dispatch(run());
            }}>{running ? 'Pause' : 'Resume'}</button>
            <div className='container'>
                <Grid snake={snake} rows={rows} cols={cols} food={food} />
            </div>
        </>
    );
}

function Grid({ snake, food, rows, cols }) {

    const grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
            grid[i][j] = <Dot x={i} y={j} isSnake={find(snake, i, j)} isFood={food[0] === i && food[1] === j} key={i + j} />
        }
    }

    return (
        <div>
            {grid.map((row) => row.map((col) => col))}
        </div>
    );
}


function Dot({ x, y, isSnake, isFood }) {

    let color = 'var(--background)';
    if (isSnake) {
        color = 'var(--snake)';
    }
    else if (isFood) {
        color = 'var(--food)';
    }
    const posX = x * 20, posY = y * 20;
    return (
        <div style={{ top: posX, left: posY, backgroundColor: color }} className='dot'></div>
    )
}

