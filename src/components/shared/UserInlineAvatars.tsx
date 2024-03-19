import { UserType } from "../../core/slices/auth/types";
import React from "react";
import { Avatar, Tooltip, Typography } from "@mui/material";

export const UserInlineAvatars = ({ attendees, maxAvatars = 6 }) => {
  const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  };

  const stringAvatar = (name: string) => {
    return {
      sx: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: stringToColor(name),
        width: 29,
        height: 29,
        fontSize: 14,
      },
      children: `${name.split(" ")[0][0]}${
        name.split(" ")[1] ? name.split(" ")[1][0] : ""
      }`,
    };
  };

  const getOthersAttendees = (attendees: UserType[]): string => {
    const othersAttendees = attendees.slice(maxAvatars);
    return othersAttendees
      .map((attendee: UserType) => attendee.username)
      .join(", ");
  };

  return (
    <>
      {attendees.map(
        (attendee: UserType, index: number) =>
          index < maxAvatars && (
            <Tooltip
              key={attendee._id}
              title={
                index === 0
                  ? attendee.username + " (создатель)"
                  : attendee.username
              }
            >
              <Avatar {...stringAvatar(attendee.username)} />
            </Tooltip>
          ),
      )}
      {attendees.length > maxAvatars && (
        <Tooltip title={getOthersAttendees(attendees)}>
          <Typography variant="body2">
            и еще {attendees.length - maxAvatars}
          </Typography>
        </Tooltip>
      )}
    </>
  );
};
