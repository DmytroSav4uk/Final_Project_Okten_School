import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {adminService} from "../../Services/admin.service";


const initialState = {
    usersArr: [],
    registerData: [],
    recreatedActivationLink: null
    }

const getAllUsers = createAsyncThunk('adminSlice/getAllUsers',

    async (_, {rejectWithValue}) => {

        try {
            const {data} = await adminService.getAllUsers()
            return data;
        } catch (e) {
            e.rejectWithValue(e.response.data)
        }
    });


const registerUser = createAsyncThunk('adminSlice/registerUser',

    async (inputData, {rejectWithValue}) => {

        try {
            const {data} = await adminService.registerUser(inputData)
            return data;
        } catch (e) {
            e.rejectWithValue(e.response.data)
        }
    });

const activateUser = createAsyncThunk('adminSlice/activateUser',

    async (inputData, {rejectWithValue}) => {

        try {
            const {data} = await adminService.activateUser(inputData)
            return data;
        } catch (e) {
            e.rejectWithValue(e.response.data)
        }
    });


const recreateActivationLink = createAsyncThunk('adminSlice/activateUser',

    async (id, {rejectWithValue}) => {

        try {
            const {data} = await adminService.recreateToken(id)
            return data;
        } catch (e) {
            e.rejectWithValue(e.response.data)
        }
    });




const adminSlice = createSlice({

    name: 'adminSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.usersArr = action.payload
            })

            .addCase(registerUser.fulfilled, (state, action) => {
                state.registerData = action.payload
                state.createUrl = true
            })
            .addCase(recreateActivationLink.fulfilled, (state, action) => {
                state.recreatedActivationLink = action.payload
            })



});

const {reducer: adminReducer} = adminSlice;

const adminActions = {
    getAllUsers,
    registerUser,
    activateUser,
    recreateActivationLink
}


export {
    adminActions,
    adminReducer
}