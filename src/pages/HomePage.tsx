import React from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../core/slices/auth/authSelector";

const AccountPage = () => {
  const user = useSelector(selectCurrentUser);

  if (!user) {
    return null;
  }

  return (
    <>
      <Typography>Текущий пользователь - {user.username}</Typography>

      <Typography>Данные пользователя:</Typography>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

export default AccountPage;
