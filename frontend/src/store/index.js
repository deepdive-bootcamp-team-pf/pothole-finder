import auth from "./auth";
import profile from "./profile";
import potholes from "./potholes";
import location from "./location";
import potholeVerifications from "./pothole-verifications";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducer = combineReducers({
  auth,
  location,
  profile,
  potholes,
  potholeVerifications,
});

export const store = configureStore({ reducer });
