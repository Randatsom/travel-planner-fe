import { createSlice } from "@reduxjs/toolkit";
import { IEvent } from "../../models/events";

const participantEventsSlice = createSlice({
  name: "participantEvents",
  initialState: [],
  reducers: {
    addNewParticipantEvent: (state, action: { payload: IEvent }) => {
      state.push(action.payload);
    },
    updateParticipantEvents: (state, action: { payload: IEvent[] }) => {
      return action.payload;
    },
  },
});

export default participantEventsSlice.reducer;
export const { addNewParticipantEvent, updateParticipantEvents } =
  participantEventsSlice.actions;
