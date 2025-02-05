import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TOnlineUsersState = {
  users: [] | string[];
};

const initialState: TOnlineUsersState = {
  users: [],
};

const activeUsersSlice = createSlice({
  name: "activeUsersSlice",
  initialState,
  reducers: {
    setActiveUsers: (state, action: PayloadAction<[] | string[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setActiveUsers } = activeUsersSlice.actions;
export default activeUsersSlice.reducer;
