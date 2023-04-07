import React, { useEffect, useMemo, useState } from 'react'
import './App.css';
import Swal from 'sweetalert2';
import icon from './snake-icon.png';

export default function App() {
    const [snake, setSnake] = useState([[20, 30], [20, 31], [20, 32]]);
    const [direction, setDirection] = useState(0);
    const [running, setRunning] = useState(true);
    const [food, setFood] = useState([-1, -1]);

    const rows = 20, cols = 35;
    let newX = 0, newY = 0, clicking = false, prevDirection = direction;

    const changeDirection = (newDirection) => {
        const val = prevDirection + newDirection;
        if (val === 2 || val === 4) {
            return;
        }
        setDirection(newDirection);
        prevDirection = newDirection;
    };

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

        if (find(snake, newHeadX, newHeadY)) {
            gameOver();
            return;
        }

        snake.unshift([newHeadX, newHeadY]);
        if (newHeadX === food[0] && newHeadY === food[1]) {
            generateFood();
        }
        else snake.pop();
        setSnake([...snake]);
    }
    const stop = () => {
        setRunning((running) => !running);
    }

    const setButtons = (e) => {
        if (clicking) return;
        clicking = true;
        setTimeout(() => clicking = false, 1);
        switch (e.key) {
            case 'a':
                changeDirection(0);
                break;
            case 'w':
                changeDirection(1);
                break;
            case 'd':
                changeDirection(2);
                break;
            case 's':
                changeDirection(3);
                break;
        }
    };
    const gameOver = () => {
        setRunning(false);
        Swal.fire({
            title: `Game over! Your score is ${15}`,
            iconHtml: `<img src="${icon}">`,
            showCancelButton: true,
            confirmButtonText: 'Play again',
            cancelButtonText: 'Cancel',
            background: 'black',
            color: 'white',
            customClass: {

            }
        });
    }
    const generateFood = () => {
        let x, y;
        do {
            x = Math.floor(Math.random() * rows);
            y = Math.floor(Math.random() * cols);
        } while (find(snake, x, y));
        setFood([x, y]);
    }

    useEffect(() => {
        window.addEventListener("keydown", setButtons);
        generateFood();
    }, []);


    useEffect(() => {
        if (running) {
            setTimeout(() => {
                move(snake);
            }, 100);
        }
    }, [snake]);


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
            grid[i][j] = <Dot x={i} y={j} snake={find(snake, i, j)} food={food[0] === i && food[1] === j} key={i + j} />
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
    const posX = x * 20, posY = y * 20;
    return (
        <div style={{ top: posX, left: posY, backgroundColor: color }} className='dot'></div>
    )
}

function find(list, i, j) {
    for (let [x, y] of list) {
        if (x === i && y === j) return true;
    }
    return false;
}
