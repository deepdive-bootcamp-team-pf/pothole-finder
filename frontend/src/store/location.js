import {createSlice} from '@reduxjs/toolkit'

//Define our reducer and action
const locationSlice = createSlice({
    name: 'location',
    initialState: [],
    reducers: {
        setLocation: (location,action) => action.payload
    }
})

// Make our actions callable as function setAllMisquotes
export const {setLocation} = locationSlice.actions

export default locationSlice.reducer

// create an export to allow async calls to our action
export const getLocation = (data) => async dispatch => {
    dispatch(setLocation(data))
}