import misquote from "./misquote"
import {combineReducers, configureStore} from "@reduxjs/toolkit";

const reducer = combineReducers({misquote})

export const store = configureStore({reducer})