import {createSlice} from '@reduxjs/toolkit'
import {httpConfig} from '../ui/utils/httpConfig'

//Define our reducer and action
const misquoteSlice = createSlice({
    name: 'misquote',
    initialState: [],
    reducers: {
        setAllMisquotes: (misquotes,action) => action.payload
        }
})

// Make our actions callable as function setAllMisquotes
export const {setAllMisquotes} = misquoteSlice.actions

export default misquoteSlice.reducer

// create an export to allow async calls to our action
export const fetchAllMisquotes = () => async dispatch => {
    const {data} = await httpConfig('/apis/misquote')
    dispatch(setAllMisquotes(data))
}
