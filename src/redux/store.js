import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {signUpInReducer} from "./slices/signUpIn.slice";
import {paidReducer} from "./slices/paid.slice";
import {adminReducer} from "./slices/admin.slice";


const rootReducer = combineReducers({
    signUpInReducer, paidReducer, adminReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});
const store = setupStore();

export {
    store,
    setupStore
}