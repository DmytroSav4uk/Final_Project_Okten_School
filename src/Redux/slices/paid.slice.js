import {paidService} from "../../services/paid.service";

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";



const initialState = {
    paidArr: [],
    groupsArr: [],
    excel:null,
    paidById: null,
    firstPage: 1,
    currentPage: 1,
    loading: false,
    rejected: false,
    success: false,
    showEdit: false
}

const getAllPaid = createAsyncThunk('paidSlice/getAllPaid',

    async (page, {_}) => {

        try {
            const {data} = await paidService.getAllPaid(page)
            return data;
        } catch (e) {
            e.rejectWithValue(e.response.data)
        }
    })

const getPaidById = createAsyncThunk('paidSlice/getPaidById',

    async (id, {_}) => {
        try {
            const {data} = await paidService.getPaidById(id)
            localStorage.setItem('editPaid', JSON.stringify(data))
            return data;
        } catch (e) {
            e.rejectWithValue(e.response.data)
        }
    })

const getPaidForComment = createAsyncThunk('paidSlice/getPaidForComment',

    async (id, {_}) => {

        try {
            const {data} = await paidService.getPaidById(id)
            localStorage.setItem('editPaid', JSON.stringify(data))
            return data;
        } catch (e) {
            e.rejectWithValue(e.response.data)
        }
    })

const patchPaidById = createAsyncThunk('paidSlice/patchPaidById',

    async (editData, {_}) => {

        try {
            const {data} = await paidService.changePaidById(editData)
            return data;
        } catch (e) {
            e.rejectWithValue(e.response.data)
        }
    });

const getAllGroups = createAsyncThunk('paidSlice/getAllGroups',

    async (_, {__}) => {

        try {
            const {data} = await paidService.getAllGroups()
            return data;
        } catch (e) {
            e.rejectWithValue(e.response.data)
        }
    })

const createGroup = createAsyncThunk('paidSlice/createGroup',

    async (name, {_}) => {

        try {
            const {data} = await paidService.createGroup(name)
            return data;
        } catch (e) {
            e.rejectWithValue(e.response.data)
        }
    })

const closeEditing = createAsyncThunk('paidSlice/closeEditing',

    async (_, {__}) => {

        try {
            return true;
        } finally {

        }
    })

const getExcel = createAsyncThunk('paidSlice/getExcel',

    async (query, {_}) => {

        try {
            const {data} = await paidService.getExcel(query)
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
            .addCase(getAllPaid.pending, (state) => {
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

            .addCase(getAllPaid.rejected, (state) => {
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

            .addCase(patchPaidById.fulfilled, (state) => {
                state.showEdit = false
            })

            .addCase(patchPaidById.rejected, (state) => {
                state.showEdit = false
            })

            .addCase(getAllGroups.fulfilled, (state, action) => {
                state.groupsArr = action.payload
            })

            .addCase(closeEditing.fulfilled, (state) => {
                state.showEdit = false
            })

            .addCase(getExcel.fulfilled, (state, action) => {
                //state.excel = action.payload

                const url = window.URL.createObjectURL(new Blob([action.payload]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${Date.now()}.xls`);
                document.body.appendChild(link);
                link.click();


            })


});

const {reducer: paidReducer} = paidSlice;

const paidActions = {
    getAllPaid,
    getPaidById,
    patchPaidById,
    getPaidForComment,
    closeEditing,
    getAllGroups,
    createGroup,
    getExcel
}


export {
    paidActions,
    paidReducer
}