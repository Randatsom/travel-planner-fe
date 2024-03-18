export interface IAuth {
  email: string;
  password: string;
}

export interface IRegister {
  username: string;
  email: string;
  password: string;
  repeatedPassword: string;
}

export enum AuthStatus {
  Idle = "idle",
  Loading = "loading",
  Succeeded = "succeeded",
  Failed = "failed",
}

export type UserType = {
  _id: string;
  email: string;
  username: string;
};

export type AuthState = {
  user: UserType;
  status: AuthStatus;
  error?: null | string;
};
