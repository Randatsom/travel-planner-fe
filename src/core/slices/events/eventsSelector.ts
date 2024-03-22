import { RootState } from "../../types";

// export const selectIsAuthenticated = (state: RootState) =>
//   Boolean(state.auth.user);
//
// export const selectIsUserLoading = (state: RootState) =>
//   state.auth.status === AuthStatus.Loading;

export const selectEvents = (state: RootState) => state.events;
