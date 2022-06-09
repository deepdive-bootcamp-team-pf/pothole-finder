import {createSlice} from '@reduxjs/toolkit'
import {httpConfig} from '../ui/utils/httpConfig'

// Define our reducer and action
const photoSlice = createSlice({
    name: 'photos',
    initialState: [],
    reducers: {
        setAllPhotos: (photos, action) => action.payload
    }
})

// Make our actions callable as function setAllMisquotes
export const {setAllMisquotes} = photoSlice.actions

export default photoSlice.reducer

// create an export to allow async calls to our action
export const fetchAllPhotos = () => async dispatch => {
    const {data} = await httpConfig('/apis/photo/')
    dispatch(setAllMisquotes(data))
}