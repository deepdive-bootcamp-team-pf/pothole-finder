import misquote from "./pothole"
import {combineReducers, configureStore} from "@reduxjs/toolkit";

const reducer = combineReducers({misquote})

export const store = configureStore({reducer})