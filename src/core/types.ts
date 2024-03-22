import { NotificationState } from "./slices/notification/types";
import { IEvent } from "./models/events";
import { UserType } from "./slices/auth/types";

export type RootState = {
  events: IEvent[];
  event: IEvent;
  participantEvents: IEvent[];
  users: UserType[];
  notification: NotificationState;
};
