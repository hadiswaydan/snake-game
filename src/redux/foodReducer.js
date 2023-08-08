import { createSlice } from '@reduxjs/toolkit';
import { rows, cols, find } from '../utils';


const foodReducer = createSlice({
    name: 'food',
    initialState: {
        position: [-1, -1],
    },
    reducers: {
        generateFood: (state, action) => {
            let x, y, snake = action.payload;
            do {
                x = Math.floor(Math.random() * rows);
                y = Math.floor(Math.random() * cols);
            } while (find(snake, x, y));
            state.position = [x, y];
        }
    }
});

export default foodReducer.reducer;

export const { generateFood } = foodReducer.actions;