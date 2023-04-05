import { createSlice } from '@reduxjs/toolkit';

export const snakeReducer = createSlice({
    name: 'snake',
    initialState: {
        positions: [[10, 15], [10, 16], [10, 17]],
    },
    reducers: {
        setSnakePosition: (state, action) => {
            state.positions = [...action.payload];
        }
    }
});

export default snakeReducer.reducer;
export const { setSnakePosition } = snakeReducer.actions;