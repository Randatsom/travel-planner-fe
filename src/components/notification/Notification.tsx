import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import { removeNotification } from "../../core/slices/notification/notificationSlice";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { Alert, Stack } from "@mui/material";
import NotificationText from "./NotificationText";
import { NotificationStatus } from "../../core/slices/notification/types";
import NotificationTitle from "./NotificationTitle";
import { RootState } from "../../core/types";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const NOTIFICATION_TIMEOUT = 10000;

const Notification = () => {
  const dispatch = useAppDispatch();
  const notifications = useSelector(
    (state: RootState) => state.notification.messages,
  );
  const activeTimers = useRef(new Map());

  useEffect(() => {
    const currentTimers = activeTimers.current;

    notifications.forEach((notification) => {
      if (!currentTimers.has(notification.id)) {
        const timer = setTimeout(() => {
          dispatch(removeNotification(notification.id));
        }, NOTIFICATION_TIMEOUT);
        currentTimers.set(notification.id, timer);
      }
    });

    return () => {
      currentTimers.forEach((timer) => clearTimeout(timer));
      currentTimers.clear();
    };
  }, [notifications, dispatch]);

  return (
    <Stack
      spacing={2}
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 1301, // mui dialog 1300
        maxWidth: 480,
      }}
    >
      {notifications.map((notification) => (
        <Alert
          key={notification.id}
          onClose={() => dispatch(removeNotification(notification.id))}
          severity={notification.status ?? NotificationStatus.Error}
          iconMapping={{
            success: <CheckCircleOutlineIcon />,
          }}
        >
          <NotificationTitle
            status={notification.status ?? NotificationStatus.Error}
            title={notification.title}
          />
          <NotificationText content={notification.text} />
        </Alert>
      ))}
    </Stack>
  );
};

export default Notification;
