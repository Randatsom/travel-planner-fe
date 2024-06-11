import { UserType } from "../../core/slices/auth/types";
import { IEventListItem } from "../../core/models/events";

export const attendeesSelectOptionsWithoutCurrentUser = (
  allUsers: UserType[] | undefined,
  currentUserId: string
) => {
  return (
    allUsers
      ?.filter((userInfo: UserType) => userInfo._id !== currentUserId)
      .map((user: UserType) => ({
        value: user._id,
        label: user.username,
      })) || []
  );
};

export const attendeesSelectOptions = (allUsers: UserType[]) => {
  return (
    allUsers?.map((user: UserType) => ({
      value: user._id,
      label: user.username,
    })) || []
  );
};

export const sortItems = (items: IEventListItem[]) => {
  items.sort((a, b) => {
    if (a.checked && !b.checked) {
      return 1;
    }

    if (!a.checked && b.checked) {
      return -1;
    }

    return 0;
  });

  return items;
};
