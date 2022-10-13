import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./loginReducer.js";
import photoReducer from "./photoReducer.js";

const allReducers = combineReducers({
    loginReducer,
    photoReducer
});

const store = configureStore({ 
    reducer: allReducers, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }), //https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
}); 

export { store };