import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {signUpInReducer} from "./slices/signUpIn.slice";
import {paidReducer} from "./slices/paid.slice";

const rootReducer = combineReducers({
    signUpInReducer, paidReducer
});

const setupStore = () => configureStore({reducer: rootReducer});
const store = setupStore();

export {
    store,
    setupStore
}