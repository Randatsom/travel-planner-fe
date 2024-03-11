import { addNotification } from "./notificationSlice";
import store from "../../store";
import { NotificationStatus } from "./types";
import { AxiosError } from "axios";

const dispatchError = (error: AxiosError<Error>) => {
  const text = error.response ? error.response.data.message : error.message;

  if (!text) {
    return;
  }

  store.dispatch(
    addNotification({
      text,
      status: NotificationStatus.Error,
    }),
  );
};

export default dispatchError;
