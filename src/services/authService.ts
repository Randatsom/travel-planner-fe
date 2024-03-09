import http from "./httpService";
import { IAuth, UserType } from "../core/slices/auth/types";

class AuthService {
  login(credentials: IAuth) {
    return http.post<UserType>("/auth/login", credentials);
  }

  register(credentials: IAuth) {
    return http.post<UserType>("/auth/register", credentials);
  }

  checkAuth() {
    return http.get("/auth/checkAuth");
  }
}

export default new AuthService();
