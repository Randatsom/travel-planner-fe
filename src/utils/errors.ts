import { addNotification } from "../core/slices/notification/notificationSlice";
import axios, { AxiosError } from "axios";
import { NotificationStatus } from "../core/slices/notification/types";
import { Dispatch } from "@reduxjs/toolkit";

type ErrorResponse = {
  message: string;
};

const dispatchErrorNotifications = (
  errorResponse: ErrorResponse,
  dispatch: Dispatch,
) => {
  if (errorResponse && errorResponse.message) {
    dispatch(
      addNotification({
        text: errorResponse.message,
        status: NotificationStatus.Error,
      }),
    );
  } else {
    dispatch(
      addNotification({
        text: "Произошла неизвестная ошибка",
        status: NotificationStatus.Error,
      }),
    );
  }
};

export const handleError = (error: unknown, dispatch: Dispatch) => {
  if (axios.isAxiosError(error)) {
    const serverError = error as AxiosError<ErrorResponse>;
    if (serverError.response) {
      dispatchErrorNotifications(serverError.response.data, dispatch);
    }
  } else if (error instanceof Error) {
    dispatch(
      addNotification({
        text: error.message || "Возникла ошибка",
        status: NotificationStatus.Error,
      }),
    );
  } else {
    dispatch(
      addNotification({
        text: "Возникла ошибка",
        status: NotificationStatus.Error,
      }),
    );
  }
};
