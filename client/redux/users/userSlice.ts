import { createSlice } from "@reduxjs/toolkit";

type TUserState = {
  uid: string | null;
  email: string | null;
};

const initialState: TUserState = {
  uid: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
    },
    clearUser: (state) => {
      state.uid = null;
      state.email = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
