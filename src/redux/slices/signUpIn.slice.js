import {signUpInService} from "../../Services/signUpIn.service";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    signInData: {},
    signInInputData:{},
    signUpData: {},
    signUpInputData:{}
}

const signIn = createAsyncThunk('signInUpSlice/signIn',

    async (signInInputData, {rejectWithValue}) => {

        try {
            const {data} = await signUpInService.signIn(signInInputData)
            console.log(data)
            return data;

        } catch (e) {
            e.rejectWithValue(e.response.data)
        }
    })


const signUp = createAsyncThunk('signInUpSlice/signUp',

    async ({rejectWithValue}) => {

        try {
            const {data} = await signUpInService.signUp()
            return data;

        } catch (e) {
            e.rejectWithValue(e.response.data)
        }
    });


const signUpInSlice = createSlice({

    name: 'signUpInSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder

            .addCase(signIn.fulfilled, (state, action) => {
                state.signInData = action.payload
                console.log(state.signInData)
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.signUpData = action.payload
                console.log(state.signUpData)
            })
});

const {reducer: signUpInReducer} = signUpInSlice;

const signUpInActions = {
    signIn,
    signUp
}


export {
    signUpInActions,
    signUpInReducer,
}
