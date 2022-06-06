import profiles from "./profile"
import potholes from "./potholes"
import photos from "./photos"
import potholeVerifications from "./potholeVerifications"
import {combineReducers, configureStore} from "@reduxjs/toolkit";

const reducer = combineReducers({profiles, potholes, photos, potholeVerifications})

export const store = configureStore({reducer})