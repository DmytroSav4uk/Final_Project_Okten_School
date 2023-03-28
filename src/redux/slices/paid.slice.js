import {paidService} from "../../Services/paid.service";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const initialState = {
    paidArr: [],
    firstPage: 1,
    currentPage: 1
}

const getAllPaid = createAsyncThunk('paidSlice/getAllPaid',

    async (page, {rejectWithValue}) => {

        try {
            const {data} = await paidService.getAllPaid(page)
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
                state.currentPage = action.payload.number + 1
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