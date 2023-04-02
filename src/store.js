import { configureStore } from "@reduxjs/toolkit";
import { snakeReducer } from "./reducers";


export default configureStore({
    reducer: {
        snake: snakeReducer.reducer,
    },
});