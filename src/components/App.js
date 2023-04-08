import React, { useEffect, useState } from 'react'
import { find, getNewHead } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { generateFood } from '../reducers/foodReducer';
import { resetSnakePosition, setSnakePosition } from '../reducers/snakeReducer';
import { setDirection, addScore, run, stop, reset } from '../reducers/gameReducer';
import Grid from './Grid';
import Swal from 'sweetalert2';
import icon from '../assets/snake-icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleWhole, faTrophy, faPause, faPlay, faRepeat } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

export default function App() {

    const dispatch = useDispatch();
    const direction = useSelector(state => state.game.direction);
    const running = useSelector(state => state.game.running);
    const score = useSelector(state => state.game.score);
    const topScore = useSelector(state => state.game.topScore);
    const food = useSelector(state => state.food.position);
    const snake = useSelector(state => state.snake.positions);
    const [isGameOver, setIsGameOver] = useState(false);

    let newX = 0, newY = 0, clicking = false;
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
    }

    const setupButtons = (e) => {
        if (clicking) return;
        clicking = true;
        setTimeout(() => clicking = false, 50);
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
        dispatch(stop());
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

    const onButtonClick = () => {
        if (isGameOver) {
            playAgain();
            return;
        }
        if (running) dispatch(stop());
        else dispatch(run());
    }

    useEffect(() => {
        window.addEventListener("keydown", setupButtons);
        dispatch(generateFood(snake));
    }, []);

    useEffect(() => {
        if (running) setTimeout(move, 100);
    }, [snake, running]);


    return (
        <>
            <h1 className='title'>Snake Game</h1>
            <div className='scoreboard'>
                <div style={{ position: 'absolute', left: 30 }}>{score} <FontAwesomeIcon icon={faAppleWhole} style={{ color: 'red', fontSize: '20px' }} /></div>
                <div style={{ position: 'absolute', left: 120 }}>{topScore} <FontAwesomeIcon icon={faTrophy} style={{ color: 'yellow', fontSize: '20px' }} /></div>
                <button className='control' onClick={onButtonClick}><FontAwesomeIcon icon={running ? faPause : isGameOver ? faRepeat : faPlay} /></button>
            </div>
            <h1 className='game-over'>{isGameOver && 'Game Over!'}</h1>
            <div className='container'>
                <Grid snake={snake} food={food} />
            </div>
        </>
    );
}


