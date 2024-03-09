import { Stack, Typography } from "@mui/material";
import RegisterForm from "../../components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h3">Регистрация</Typography>

      <RegisterForm />
    </Stack>
  );
};

export default RegisterPage;
