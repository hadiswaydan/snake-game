import { configureStore } from "@reduxjs/toolkit";
import snakeReducer from "./snakeReducer";
import gameReducer from './gameReducer';
import foodReducer from "./foodReducer";

export default configureStore({
    reducer: {
        game: gameReducer,
        snake: snakeReducer,
        food: foodReducer,
    },
});

