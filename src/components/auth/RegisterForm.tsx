import { Button, Grid, Stack } from "@mui/material";
import paths from "../../routes/paths";
import { IAuth, IRegister } from "../../core/slices/auth/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import TextFieldController from "../forms/textField/TextFieldController";
import { registrationSchema } from "./utils";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import { loginUser, registerUser } from "../../core/slices/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = false;

  const { handleSubmit, control } = useForm<IRegister>({
    mode: "onChange",
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = async (data: IAuth) => {
    try {
      const result = await dispatch(registerUser(data));
      console.log(result);
      navigate(paths.HOME);
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Stack direction="column" spacing={2}>
            <TextFieldController
              label="Отображаемое имя"
              name="username"
              type="text"
              control={control}
              autoComplete="off"
            />
            <TextFieldController
              label="Email"
              name="email"
              type="text"
              control={control}
              autoComplete="off"
            />
            <Stack direction="row" spacing={2}>
              <TextFieldController
                label="Пароль"
                name="password"
                type="password"
                control={control}
                autoComplete="off"
              />

              <TextFieldController
                label="Повторите пароль"
                name="repeatedPassword"
                type="password"
                control={control}
                autoComplete="off"
              />
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <Button disabled={isLoading}>
              <Link to={paths.LOGIN} className="linkStyle">
                Войти
              </Link>
            </Button>

            <Button type="submit" variant="contained" disabled={isLoading}>
              Регистрация
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default RegisterForm;
