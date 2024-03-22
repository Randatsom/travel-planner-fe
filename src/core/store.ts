import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth/authSlice";
import notificationSlice from "./slices/notification/notificationSlice";
import modalSlice from "./slices/modal/modalSlice";
import eventsSlice from "./slices/events/eventsSlice";
import usersSlice from "./slices/users/usersSlice";
import participantEventsSlice from "./slices/participantEvents/participantEventsSlice";
import eventSlice from "./slices/event/eventSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    notification: notificationSlice,
    modal: modalSlice,
    events: eventsSlice,
    event: eventSlice,
    users: usersSlice,
    participantEvents: participantEventsSlice,
  },
});

export default store;
