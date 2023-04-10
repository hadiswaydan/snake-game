import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    positions: [[ 5 , 8], [5, 9], [5, 10]],
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