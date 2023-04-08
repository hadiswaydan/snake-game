import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    direction: 0,
    prevDirection: 0,
    score: 0,
    topScore: localStorage.getItem('topScore') || 0,
    running: true,
};

const gameReducer = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setDirection: (state, action) => {
            const newDirection = action.payload;
            if ([2, 4].includes(newDirection + state.prevDirection)) return;
            state.direction = newDirection;
            state.prevDirection = newDirection;
        },
        addScore: (state) => {
            state.score++;
            if (state.score > state.topScore) {
                state.topScore = state.score;
            }
        },
        run: (state) => {
            state.running = true;
        },
        stop: (state) => {
            state.running = false;
        },
        reset: (state) => {
            return { ...initialState, topScore: state.topScore };
        },
    }
});

export default gameReducer.reducer;
export const { setDirection, addScore, run, stop, reset } = gameReducer.actions;