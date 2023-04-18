import {paidService} from "../../services/paid.service";

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const initialState = {
    paidArr: [],
    paidById: null,
    firstPage: 1,
    currentPage: 1,
    loading: false,
    rejected: false,
    success: false,
    showEdit: false
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


const getPaidById = createAsyncThunk('paidSlice/getPaidById',

    async (id, {rejectWithValue}) => {

        try {
            const {data} = await paidService.getPaidById(id)
            return data;
        } catch (e) {
            e.rejectWithValue(e.response.data)
        }
    })


const getPaidForComment = createAsyncThunk('paidSlice/getPaidForComment',

    async (id, {rejectWithValue}) => {

        try {
            const {data} = await paidService.getPaidById(id)
            return data;
        } catch (e) {
            e.rejectWithValue(e.response.data)
        }
    })

const patchPaidById = createAsyncThunk('paidSlice/patchPaidById',

    async (url, {rejectWithValue}) => {

        try {
            const {data} = await paidService.changePaidByUrl(url)
            return data;
        } catch (e) {
            e.rejectWithValue(e.response.data)
        }
    })


const closeEditing = createAsyncThunk('paidSlice/closeEditing',

    async (_, {rejectWithValue}) => {

        try {
            return true;
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
            .addCase(getAllPaid.pending, (state, action) => {
                state.loading = true
                state.rejected = false
                state.success = false
            })

            .addCase(getAllPaid.fulfilled, (state, action) => {
                state.paidArr = action.payload
                state.currentPage = action.payload.number + 1
                state.loading = false
                state.success = true
                state.rejected = false
            })

            .addCase(getAllPaid.rejected, (state, action) => {
                state.loading = false
                state.rejected = true
                state.success = false
            })

            .addCase(getPaidById.fulfilled, (state, action) => {
                state.paidById = action.payload
                state.showEdit = true
            })

            .addCase(getPaidForComment.fulfilled, (state, action) => {
                state.paidById = action.payload
            })

            .addCase(patchPaidById.fulfilled, (state, action) => {
                state.showEdit = false
            })

            .addCase(patchPaidById.rejected, (state, action) => {
                state.showEdit = false
            })

            .addCase(closeEditing.fulfilled, (state, action) => {
                state.showEdit = false
            })


});

const {reducer: paidReducer} = paidSlice;

const paidActions = {
    getAllPaid,
    getPaidById,
    patchPaidById,
    getPaidForComment,
    closeEditing
}


export {
    paidActions,
    paidReducer
}