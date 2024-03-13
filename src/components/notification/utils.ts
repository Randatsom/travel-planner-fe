import { NotificationTitleProps } from "./types";
import { NotificationStatus } from "../../core/slices/notification/types";

const getNotificationTitle = ({ status, title }: NotificationTitleProps) => {
  const defaultText =
    status === NotificationStatus.Error ? "Возникла ошибка" : "";

  if (title) {
    return title;
  }

  return defaultText;
};

export default getNotificationTitle;
