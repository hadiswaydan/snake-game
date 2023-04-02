import React, { useCallback, useEffect, useState } from 'react'
import './App.css';

export default function App() {
    const rows = 40;
    const cols = 70;

    const [snake, setSnake] = useState([[15, 11], [15, 12], [15, 13]]);
    const [direction, setDirection] = useState(2);
    const [intervalId, setIntervalId] = useState(null);
    const [running, setRunning] = useState(true);
    const [changing, setChanging] = useState(false);

    let newX = 0, newY = 0;

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

        // if (find(snake.shift(), newHeadX, newHeadY)) {
        //     setRunning(false);
        //     return;
        // }

        if (newHeadX < 0) newHeadX = rows - 1;
        if (newHeadY < 0) newHeadY = cols - 1;
        if (newHeadX >= rows) newHeadX = 0;
        if (newHeadY >= cols) newHeadY = 0;

        snake.unshift([newHeadX, newHeadY]);
        snake.pop();
        setSnake([...snake]);
    }
    const stop = () => {
        setRunning((running) => !running);
    }

    const generateFoodPos = () => {
        let x, y;
        do {
            x = Math.floor(Math.random() * rows);
            y = Math.floor(Math.random() * cols);
        } while (find(snake, x, y));
        setFood([x, y]);
    }
    const [food, setFood] = useState([-1, -1]);

    const play = () => {
        const id = setInterval(() => {
            move();
        }, 100);
        setIntervalId(id);
        setChanging(false);
    }

    useEffect(() => {
        generateFoodPos();
        window.addEventListener("keydown", e => {
            e.preventDefault();

            switch (e.key) {
                case 'a':
                    setDirection(0);
                    break;
                case 'w':
                    setDirection(1);
                    break;
                case 'd':
                    setDirection(2);
                    break;
                case 's':
                    setDirection(3);
                    break;
            }
            setTimeout(() => { }, 5);
        });
    }, []);


    useEffect(() => {
        if (intervalId) {
            clearInterval(intervalId);
            if (!running || changing) return;
            setChanging(true);
            move();
        }
        play();

    }, [direction, running]);

    return (
        <>
            <button className='stop' onClick={stop}>{running ? 'Pause' : 'Resume'}</button>
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
            grid[i][j] = <Dot x={i} y={j} snake={find(snake, i, j)} food={food[0] == i && food[1] == j} key={i + j} />
        }
    }

    return (
        <div>
            {grid.map((row) => row.map((col) => col))}
        </div>
    );
}


function Dot({ x, y, snake, food }) {

    let color = 'var(--background)';
    if (snake) {
        color = 'var(--snake)';
    }
    else if (food) {
        color = 'var(--food)';
    }
    const posX = x * 10, posY = y * 10;
    return (
        <div style={{ top: posX, left: posY, backgroundColor: color }} className='dot'></div>
    )
}

function find(list, i, j) {
    for (let [x, y] of list) {
        if (x == i && y == j) return true;
    }
    return false;
}

