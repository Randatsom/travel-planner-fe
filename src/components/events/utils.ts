import { UserType } from "../../core/slices/auth/types";

export const attendeesSelectOptions = (
  allUsers: UserType[],
  currentUserId: string,
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
