import _ from 'lodash'
import { createSlice } from '@reduxjs/toolkit'
import {httpConfig} from '../ui/utils/httpConfig'
import {fetchPotholeByPotholeId} from './potholes'

const slice = createSlice({
    name: "potholeVerifications",
    initialState: [],
    reducers: {
        getAllPotholeVerifications: (potholeVerifications, action) => {
            return action.payload
        },
        getAllPotholeVerificationsByPotholeId: (potholeVerifications, action) => {
            return action.payload
        },
        setNewPotholeVerification:(potholeVerifications, action) => {
            potholeVerifications.push(action.payload)
}

    }
})

export const {getAllPotholeVerifications, setNewPotholeVerification} = slice.actions

export const fetchAllPotholeVerifications = () => async (dispatch) => {
    const {data} =  await httpConfig.get("/apis/pothole-verification/");
    dispatch(getAllPotholeVerifications(data));
};

export const {getAllPotholeVerificationsByPotholeId} = slice.actions

export const fetchPotholeVerificationsByPotholeId = () => async (dispatch, getState) => {
    const {data} = await httpConfig('/apis/pothole-verification');
    dispatch(getAllPotholeVerificationsByPotholeId(data));
    const potholeIds = _.uniq(_.map(getState().potholes, "potholeVerificationPotholeId"));
    potholeIds.forEach(id => dispatch(fetchPotholeByPotholeId(id)));
};

export default slice.reducer