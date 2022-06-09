import { createSlice } from '@reduxjs/toolkit'
import {httpConfig} from '../ui/utils/httpConfig'

const slice = createSlice({
    name: "potholeVerifications",
    initialState: [],
    reducers: {
        getAllPotholeVerifications: (potholeVerifications, action) => {
            return action.payload
        }
    }
})

export const {getAllPotholeVerifications} = slice.actions

export const fetchAllPotholeVerifications = () => async (dispatch) => {
    const {data} =  await httpConfig.get("/apis/potholeVerification/");
    dispatch(getAllPotholeVerifications(data));
};

export default slice.reducer