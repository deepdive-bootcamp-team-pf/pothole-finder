import {createSlice} from '@reduxjs/toolkit'
import {httpConfig} from '../utils/httpConfig'

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