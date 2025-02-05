import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TSocketState = {
  isConnected: boolean; // ✅ Store only serializable data
};

const initialState: TSocketState = {
  isConnected: false,
};

const socketSlice = createSlice({
  name: "socketState",
  initialState,
  reducers: {
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload; // ✅ Store only connection status
    },
  },
});

export const { setConnected } = socketSlice.actions;
export default socketSlice.reducer;
