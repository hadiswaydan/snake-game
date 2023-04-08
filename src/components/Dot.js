import React from 'react'

export const Dot = React.memo(({ x, y, isSnake, isHead, isFood }) => {

    let classes = 'dot ';
    if (isSnake) {
        classes += 'snake ';
        if (isHead) classes += 'head';
    }
    else if (isFood) {
        classes += 'food';
    }
    return (
        <div style={{ top: x * 30, left: y * 30, }} className={classes}>
        </div>
    )
});
