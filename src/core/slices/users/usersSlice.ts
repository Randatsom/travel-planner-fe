import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../auth/types";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    updateUsers: (state, action: { payload: UserType[] }) => {
      return action.payload;
    },
  },
});

export default usersSlice.reducer;
export const { updateUsers } = usersSlice.actions;
