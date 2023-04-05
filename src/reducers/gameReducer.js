import { createSlice } from '@reduxjs/toolkit';

const gameReducer = createSlice({
    name: 'game',
    initialState: {
        direction: 0,
        prevDirection: 0,
        intervalId: null,
        running: true,
    },
    reducers: {
        setDirection: (state, action) => {
            const newDirection = action.payload;
            if ([2, 4].includes(newDirection + state.prevDirection)) return;
            state.direction = newDirection;
        },
        setIntervalId: (state, action) => {
            state.intervalId = action.payload;
        },
        resetIntervalId: (state) => {
            state.intervalId = null;
        },
        run: (state) => {
            state.running = true;
        },
        stop: (state) => {
            state.running = false;
        },

    }
});

export default gameReducer.reducer;
export const { setDirection, setIntervalId, resetIntervalId, run, stop } = gameReducer.actions;