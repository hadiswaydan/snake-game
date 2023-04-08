import React from 'react';
import {Dot} from './Dot';
import { find, isSnakeHead, rows, cols } from '../utils';


export default function Grid({snake, food}) {

    const grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
            grid[i][j] = (<Dot x={i} y={j} isSnake={find(snake, i, j)} isFood={food[0] === i && food[1] === j} isHead={isSnakeHead(snake, i, j)} key={i + j} />)
        }
    }

    return (
        <div>
            {grid.map((row) => row.map((col) => col))}
        </div>
    );
}

