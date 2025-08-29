import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: any;
}

const initialState: UserState = { user: null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
