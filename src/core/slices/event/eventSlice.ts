import { createSlice } from "@reduxjs/toolkit";
import { IEvent } from "../../models/events";

const eventSlice = createSlice({
  name: "event",
  initialState: null,
  reducers: {
    updateEvent: (_, action: { payload: IEvent }) => {
      return action.payload;
    },
  },
});

export default eventSlice.reducer;
export const { updateEvent } = eventSlice.actions;
