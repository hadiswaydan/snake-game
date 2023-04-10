import React, { useCallback, useEffect, useState } from 'react'
import { find, getNewHead } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { generateFood } from '../reducers/foodReducer';
import { resetSnakePosition, setSnakePosition } from '../reducers/snakeReducer';
import { setDirection, addScore, run, stop, reset } from '../reducers/gameReducer';
import Grid from './Grid';
import Swal from 'sweetalert2';
import icon from '../assets/snake-icon.png';
import '../App.css';
import { Scoreboard } from './Scoreboard';


export default function App() {

    const dispatch = useDispatch();
    const direction = useSelector(state => state.game.direction);
    const running = useSelector(state => state.game.running);
    const score = useSelector(state => state.game.score);
    const topScore = useSelector(state => state.game.topScore);
    const food = useSelector(state => state.food.position);
    const snake = useSelector(state => state.snake.positions);
    const [isGameOver, setIsGameOver] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    let newX = 0, newY = 0, clicking = false, moving = false;
    const gameOverAlert = {
        title: `Game over! Your score is ${score}`,
        iconHtml: `<img src="${icon}">`,
        showCancelButton: true,
        confirmButtonText: 'Play again',
        cancelButtonText: 'Cancel',
        background: 'black',
        color: 'white',
        confirmButtonColor: '#148C32',
        cancelButtonColor: '#d10808',
    };

    const move = () => {
        moving = true;
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
        let [newHeadX, newHeadY] = getNewHead(snake[0], newX, newY);
        let newSnake = snake.slice();
        if (find(newSnake, newHeadX, newHeadY)) {
            gameOver();
            return;
        }

        newSnake.unshift([newHeadX, newHeadY]);
        if (newHeadX === food[0] && newHeadY === food[1]) {
            dispatch(generateFood(newSnake));
            dispatch(addScore());
        }
        else newSnake.pop();
        dispatch(setSnakePosition(newSnake));
        moving = false;
    }

    const setupButtons = (e) => {
        if (clicking) return;
        clicking = true;
        setTimeout(() => clicking = false, 10);
        switch (e.key) {
            case 'a':
            case 'A':
            case 'ArrowLeft':
                dispatch(setDirection(0));
                break;
            case 'w':
            case 'W':
            case 'ArrowUp':
                dispatch(setDirection(1));
                break;
            case 'd':
            case 'D':
            case 'ArrowRight':
                dispatch(setDirection(2));
                break;
            case 's':
            case 'S':
            case 'ArrowDown':
                dispatch(setDirection(3));
                break;
        }
    };
    const gameOver = () => {
        dispatch(stop(true));
        setIsGameOver(true);
        localStorage.setItem('topScore', topScore);
        Swal.fire(gameOverAlert).then((resp) => {
            if (resp.isConfirmed) {
                playAgain();
            }
        });
    }
    const playAgain = () => {
        dispatch(resetSnakePosition());
        dispatch(reset());
        setIsGameOver(false);
    }

    const onControlClick = useCallback(() => {
        if (isGameOver) {
            playAgain();
            return;
        }
        if (running) dispatch(stop());
        else dispatch(run());
    }, [isGameOver, running]);


    useEffect(() => {
        window.addEventListener("keydown", setupButtons);
        dispatch(generateFood(snake));

    }, []);

    useEffect(() => {
        if (!running) return;
        
        setTimeout(move, 100);
    }, [snake, running,]);

    // useEffect(() => {
    //     if (moving) return;
    //     clearTimeout(timeoutId);
    //     setTimeoutId(null);
    //     move();
    // }, [direction]);


    return (
        <>
            <h1 className='title'>Snake Game</h1>
            <Scoreboard isGameOver={isGameOver} onControlClick={onControlClick} running={running} score={score} topScore={topScore} />
            <h1 className='game-over'>{isGameOver && 'Game Over!'}</h1>
            <div className='container'>
                <Grid snake={snake} food={food} />
            </div>
        </>
    );
}


