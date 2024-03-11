import { Button, Grid, Stack } from "@mui/material";
import paths from "../../routes/paths";
import { IAuth } from "../../core/slices/auth/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import TextFieldController from "../forms/textField/TextFieldController";
import { authSchema } from "./utils";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import { loginUser } from "../../core/slices/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { handleError } from "../../utils/errors";
import { unwrapResult } from "@reduxjs/toolkit";
import { addNotification } from "../../core/slices/notification/notificationSlice";
import { NotificationStatus } from "../../core/slices/notification/types";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = false;

  const { handleSubmit, control } = useForm<IAuth>({
    mode: "onChange",
    resolver: yupResolver(authSchema),
  });

  const onSubmit = async (data: IAuth) => {
    try {
      const result = await dispatch(loginUser(data));
      unwrapResult(result);
      navigate(paths.HOME);
    } catch (error) {
      handleError(error, dispatch);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <TextFieldController label="Email" name="email" control={control} />
            <TextFieldController
              label="Пароль"
              name="password"
              control={control}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" disabled={isLoading}>
              Войти
            </Button>

            <Button disabled={isLoading}>
              <Link to={paths.REGISTER} className="linkStyle">
                Регистрация
              </Link>
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
