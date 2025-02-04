import { createSlice } from "@reduxjs/toolkit";

type TUserState = {
  uid: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
} | null;

const initialState: TUserState = {
  uid: null,
  email: null,
  firstName: null,
  lastName: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    clearUser: (state) => {
      state.uid = null;
      state.email = null;
      state.firstName = null;
      state.lastName = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
