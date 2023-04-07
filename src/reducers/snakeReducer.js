import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    positions: [[10, 15], [10, 16], [10, 17]],
};

export const snakeReducer = createSlice({
    name: 'snake',
    initialState,
    reducers: {
        setSnakePosition: (state, action) => {
            state.positions = [...action.payload];
        },
        resetSnakePosition: (_) => initialState,
    }
});

export default snakeReducer.reducer;
export const { setSnakePosition, resetSnakePosition } = snakeReducer.actions;