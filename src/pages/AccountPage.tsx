import { Stack, Typography } from "@mui/material";
import Account from "../components/account/Account";

const AccountPage = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h3">Настройки аккаунта</Typography>

      <Account />
    </Stack>
  );
};

export default AccountPage;
