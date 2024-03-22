import { createSlice } from "@reduxjs/toolkit";
import { IEvent } from "../../models/events";

const eventsSlice = createSlice({
  name: "events",
  initialState: [],
  reducers: {
    addNewEvent: (state, action: { payload: IEvent }) => {
      state.push(action.payload);
    },
    updateEvents: (state, action: { payload: IEvent[] }) => {
      return action.payload;
    },
  },
});

export default eventsSlice.reducer;
export const { addNewEvent, updateEvents } = eventsSlice.actions;
