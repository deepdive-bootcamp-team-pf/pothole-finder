import { createSlice } from "@reduxjs/toolkit";
import { httpConfig } from "../ui/utils/httpConfig";

const potholeSlice = createSlice({
  name: "pothole",
  initialState: [],
  reducers: {
    setAllPotholes: (pothole, action) => {
      return action.payload;
    },
    setPotholeByPotholeId: (pothole, action) => {
      pothole[action.payload.id] = action.payload.data;
    },
  },
});

export const { setAllPotholes, setPotholeByPotholeId } = potholeSlice.actions;

export default potholeSlice.reducer;

export const fetchAllPotholes = () => async (dispatch) => {
  const { data } = await httpConfig("/apis/pothole");
  dispatch(setAllPotholes(data));
};

export const fetchPotholeByPotholeId = (id) => async (getState) => {
  await getState().pothole;
};
