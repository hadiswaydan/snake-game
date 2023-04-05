import { configureStore } from "@reduxjs/toolkit";
import snakeReducer from "./reducers/snakeReducer";
import gameReducer from './reducers/gameReducer';
import foodReducer from "./reducers/foodReducer";

export default configureStore({
    reducer: {
        game: gameReducer,
        snake: snakeReducer,
        food: foodReducer,
    },
});

