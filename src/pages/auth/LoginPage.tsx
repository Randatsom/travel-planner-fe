import LoginForm from "../../components/auth/LoginForm";
import { Stack, Typography } from "@mui/material";

const LoginPage = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h3">Вход</Typography>

      <LoginForm />
    </Stack>
  );
};

export default LoginPage;
