import React, { useCallback, useEffect, useState } from "react";
import { find, getNewHead, getDirectionFromKey } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { generateFood } from "../redux/foodReducer";
import { resetSnakePosition, setSnakePosition } from "../redux/snakeReducer";
import {
  setDirection,
  addScore,
  run,
  stop,
  reset,
} from "../redux/gameReducer";
import Grid from "./Grid";
import Swal from "sweetalert2";
import icon from "../assets/snake-icon.png";
import "../App.css";
import { Scoreboard } from "./Scoreboard";

export default function App() {
  const dispatch = useDispatch();
  const direction = useSelector((state) => state.game.direction);
  const running = useSelector((state) => state.game.running);
  const score = useSelector((state) => state.game.score);
  const topScore = useSelector((state) => state.game.topScore);
  const food = useSelector((state) => state.food.position);
  const snake = useSelector((state) => state.snake.positions);
  const [isGameOver, setIsGameOver] = useState(false);

  let clicking = false;
  const gameOverAlert = {
    title: `Game over! Your score is ${score}`,
    iconHtml: `<img src="${icon}">`,
    showCancelButton: true,
    confirmButtonText: "Play again",
    cancelButtonText: "Cancel",
    background: "black",
    color: "white",
    confirmButtonColor: "#148C32",
    cancelButtonColor: "#d10808",
  };

  const move = () => {
    if (!running) return;
    let [newHeadX, newHeadY] = getNewHead(snake[0], direction);
    let newSnake = snake.slice();
    if (find(newSnake, newHeadX, newHeadY)) {
      gameOver();
      return;
    }
    newSnake.unshift([newHeadX, newHeadY]);
    if (newHeadX === food[0] && newHeadY === food[1]) {
      dispatch(generateFood(newSnake));
      dispatch(addScore());
    } else newSnake.pop();
    dispatch(setSnakePosition(newSnake));
  };

  const setupButtons = (e) => {
    if (clicking) return;
    let newDir = getDirectionFromKey(e.key);
    if (newDir === -1) return;
    dispatch(setDirection(newDir));
    clicking = true;
    setTimeout(() => (clicking = false), 65);
  };

  const gameOver = () => {
    dispatch(stop(true));
    setIsGameOver(true);
    localStorage.setItem("topScore", topScore);
    Swal.fire(gameOverAlert).then((resp) => {
      if (resp.isConfirmed) {
        playAgain();
      }
    });
  };

  const playAgain = () => {
    dispatch(resetSnakePosition());
    dispatch(reset());
    setIsGameOver(false);
  };

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
  }, [running, snake]);

  return (
    <>
      <h1 className="title">Snake Game</h1>
      <Scoreboard
        isGameOver={isGameOver}
        onControlClick={onControlClick}
        running={running}
        score={score}
        topScore={topScore}
      />
      <h1 className="game-over">{isGameOver && "Game Over!"}</h1>
      <div className="container">
        <Grid snake={snake} food={food} />
      </div>
    </>
  );
}
