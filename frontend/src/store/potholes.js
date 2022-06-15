import {createSlice} from '@reduxjs/toolkit'
import {httpConfig} from '../ui/utils/httpConfig'

//Define our reducer and action
const potholeSlice = createSlice({
    name: 'pothole',
    initialState: [],
    reducers: {
        setAllPotholes: (pothole, action) => {
            return action.payload
        },
        setPotholeByPotholeId: (pothole, action) => {
            pothole[action.payload.id] = action.payload.data
        }
    }
})

// Make our actions callable as function setAllMisquotes
export const {setAllPotholes, setPotholeByPotholeId} = potholeSlice.actions

export default potholeSlice.reducer

// create an export to allow async calls to our action
export const fetchAllPotholes = () => async dispatch => {
    const {data} = await httpConfig('/apis/pothole')
    dispatch(setAllPotholes(data))
}

export const fetchPotholeByPotholeId = (id) => async (dispatch, getState) => {
    const pothole = getState().pothole
    if (pothole[id] === undefined) {
        const {data} = await httpConfig(`apis/pothole/${id}`)
        dispatch(setPotholeByPotholeId({id, data}))
    }
}