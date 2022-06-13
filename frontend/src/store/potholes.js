import {createSlice} from '@reduxjs/toolkit'
import {httpConfig} from '../ui/utils/httpConfig'

//Define our reducer and action
const potholeSlice = createSlice({
    name: 'pothole',
    initialState: [],
    reducers: {
        setAllPotholes: (potholes,action) => action.payload
        }
})

// Make our actions callable as function setAllMisquotes
export const {setAllPotholes} = potholeSlice.actions

export default potholeSlice.reducer

// create an export to allow async calls to our action
export const fetchAllPotholes = () => async dispatch => {
    const {data} = await httpConfig('/apis/pothole')
    dispatch(setAllPotholes(data))
}