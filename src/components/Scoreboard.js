import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleWhole, faTrophy, faPause, faPlay, faRepeat, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSound } from '../reducers/gameReducer';

export const Scoreboard = React.memo(({ score, topScore, running, isGameOver, onControlClick }) => {

    const dispatch = useDispatch();
    const muted = useSelector(state => state.game.muted);

    const appleIcon = (
        <FontAwesomeIcon icon={faAppleWhole} style={{ color: 'red', fontSize: '20px' }} />
    );

    const trophyIcon = (
        <FontAwesomeIcon icon={faTrophy} style={{ color: 'yellow', fontSize: '20px' }} />
    );

    const controlIcon = (
        <FontAwesomeIcon icon={running ? faPause : isGameOver ? faRepeat : faPlay} />
    );

    const soundIcon = (
        <FontAwesomeIcon icon={muted ? faVolumeXmark : faVolumeHigh} onClick={() => {
            dispatch(toggleSound());
        }}
        width={50}
        />
    );


    return (
        <div className='scoreboard'>
            <div style={{ position: 'absolute', left: 30, }}>{score} {appleIcon}</div>
            <div style={{ position: 'absolute', left: 120, }}>{topScore} {trophyIcon}</div>
            <button className='control' onClick={onControlClick}>{controlIcon}</button>
            <div style={{position: 'absolute', right: 10,}}>{soundIcon}</div>
        </div>
    );
})
