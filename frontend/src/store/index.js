import profile from "./profile"
import potholes from "./potholes"
import photos from "./photos"
import potholeVerifications from "./pothole-verifications"
import {combineReducers, configureStore} from '@reduxjs/toolkit'

const reducer = combineReducers({profile, potholes, photos, potholeVerifications})

export const store = configureStore({reducer})