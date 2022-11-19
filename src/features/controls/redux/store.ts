import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CameraTypes, ControlsInitial } from "../types";

const initialState: ControlsInitial = {
  cameraType: "player",
};

export const ControlsSlice = createSlice({
  initialState,
  name: "controls",
  reducers: {
    setCameraType: (state, action: PayloadAction<CameraTypes>) => {
      state.cameraType = action.payload;
    },
  },
});

export const { setCameraType } = ControlsSlice.actions;

export default ControlsSlice.reducer;
