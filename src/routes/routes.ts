import HomePage from "../pages/HomePage";
import { RouteType } from "./types";
import paths from "./paths";
import AccountLayout from "../layouts/AccountLayout";
import AuthLayout from "../layouts/AuthLayout";
import { protectRoutes } from "./utils";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import AccountPage from "../pages/AccountPage";

const authRoutes = [
  {
    path: paths.LOGIN,
    component: LoginPage,
    layout: AuthLayout,
  },
  {
    path: paths.REGISTER,
    component: RegisterPage,
    layout: AuthLayout,
  },
];

const protectedRoutes = protectRoutes([
  {
    path: paths.HOME,
    component: HomePage,
    layout: AccountLayout,
    layoutProps: { maxWidth: "xl" },
  },
  {
    path: paths.ACCOUNT,
    component: AccountPage,
    layout: AccountLayout,
    layoutProps: { maxWidth: "md" },
  },
]);

const routes: RouteType[] = [...authRoutes, ...protectedRoutes];

export { routes };
