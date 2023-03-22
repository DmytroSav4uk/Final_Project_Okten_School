import {paidService} from "../../Services/paid.service";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const initialState = {
    paidArr: []
}

const getAllPaid = createAsyncThunk('paidSlice/getAllPaid',

    async (token, {rejectWithValue}) => {

        try {
            const {data} = await paidService.getAllPaid(token)
            console.log(data)
            return data;

        } catch (e) {
            e.rejectWithValue(e.response.data)
        }
    })


const paidSlice = createSlice({

    name: 'paidSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAllPaid.fulfilled, (state, action) => {
                state.paidArr = action.payload
                console.log(state.paidArr)
            })

});

const {reducer: paidReducer} = paidSlice;

const paidActions = {
   getAllPaid
}


export {
   paidActions,
    paidReducer
}
