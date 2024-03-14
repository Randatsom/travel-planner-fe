import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth/authSlice";
import notificationSlice from "./slices/notification/notificationSlice";
import modalSlice from "./slices/modal/modalSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    notification: notificationSlice,
    modal: modalSlice,
  },
});

export default store;
