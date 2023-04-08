import React from 'react'

export default function Dot({ x, y, isSnake, isHead, isFood }) {

    let classes = 'dot ';
    if (isSnake) {
        classes += 'snake ';
        if (isHead) classes += 'head';
    }
    else if (isFood) {
        classes += 'food';
    }
    return (
        <div style={{ top: x * 20, left: y * 20, }} className={classes}>
        </div>
    )
}