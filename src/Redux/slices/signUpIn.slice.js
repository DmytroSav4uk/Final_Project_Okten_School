import {signUpInService} from "../../services/signUpIn.service";

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const initialState = {
    signInData: {},
    signUpData: {},
    error: false,
    redirect: false,
    isLogged: false
}

const signIn = createAsyncThunk('signInUpSlice/signIn',

    async (signInInputData, {rejectWithValue}) => {

        try {
            const {data} = await signUpInService.signIn(signInInputData)
            localStorage.setItem('currentUser', JSON.stringify(data))
            return data;
        } catch (e) {
            e.rejectWithValue(e.response.data)
        }
    })

const signUpInSlice = createSlice({

    name: 'signUpInSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(signIn.fulfilled, (state, action) => {
                state.error = false
                state.signInData = action.payload
                state.redirect = true
                state.isLogged = true
            })

            .addCase(signIn.rejected, (state, action) => {
                state.error = true
                state.redirect = false
            })
});

const {reducer: signUpInReducer} = signUpInSlice;

const signUpInActions = {
    signIn
}


export {
    signUpInActions,
    signUpInReducer,
}
