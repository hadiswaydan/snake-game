import { createSlice } from '@reduxjs/toolkit';
import { eatSound, moveSound, dieSound } from '../utils';

const initialState = {
    direction: 0,
    prevDirection: 0,
    score: 0,
    topScore: localStorage.getItem('topScore') || 0,
    running: true,
    muted: false,
};

const gameReducer = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setDirection: (state, action) => {
            if (!state.running) return;
            const newDirection = action.payload;
            if (newDirection === state.prevDirection) return;
            if ([2, 4].includes(newDirection + state.prevDirection)) return;
            state.direction = newDirection;
            state.prevDirection = newDirection;
            if (!state.muted) moveSound.play();
        },
        addScore: (state) => {
            if (!state.muted) eatSound.play();
            state.score++;
            if (state.score > state.topScore) {
                state.topScore = state.score;
            }
        },
        run: (state) => {
            state.running = true;
        },
        stop: (state, action) => {
            state.running = false;
            if (action.payload && !state.muted) {
                dieSound.play();
            }
        },
        reset: (state) => {
            return { ...initialState, topScore: state.topScore, muted: state.muted };
        },
        toggleSound: (state) => {
            state.muted = !state.muted;
        }
    }
});

export default gameReducer.reducer;
export const { setDirection, addScore, run, stop, reset, toggleSound } = gameReducer.actions;