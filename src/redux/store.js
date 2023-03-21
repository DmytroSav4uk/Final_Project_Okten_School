import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {signUpInReducer} from "./slices/signUpIn.slice";

const rootReducer = combineReducers({
    signUpInReducer
});

const setupStore = () => configureStore({reducer: rootReducer});
const store = setupStore();

export {
    store,
    setupStore

}