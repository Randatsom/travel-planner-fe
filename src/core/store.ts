import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth/authSlice";
import notificationSlice from "./slices/notification/notificationSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    notification: notificationSlice,
  },
});

export default store;
