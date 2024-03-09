import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState, AuthStatus, IAuth, IRegister, UserType } from "./types";
import AuthService from "../../../services/authService";

const USER_STORAGE_KEY = "isUserLoggedIn";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: IAuth, { rejectWithValue }) => {
    try {
      return await AuthService.login(credentials);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials: IRegister, { rejectWithValue }) => {
    try {
      return await AuthService.register(credentials);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      return await AuthService.checkAuth();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const initialState: AuthState = {
  user: null,
  status: AuthStatus.Idle,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = AuthStatus.Loading;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: { payload: UserType }) => {
        state.status = AuthStatus.Succeeded;
        state.user = action.payload;
        localStorage.setItem("token", action.payload.token);
      },
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = AuthStatus.Failed;
      state.error = action.error.message;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.status = AuthStatus.Loading;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: { payload: UserType }) => {
        state.status = AuthStatus.Succeeded;
        state.user = action.payload;
        localStorage.setItem("token", action.payload.token);
      },
    );
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = AuthStatus.Failed;
      state.error = action.error.message;
    });
    builder.addCase(checkAuth.pending, (state) => {
      state.status = AuthStatus.Loading;
    });
    builder.addCase(
      checkAuth.fulfilled,
      (state, action: { payload: UserType }) => {
        state.status = AuthStatus.Succeeded;
        state.user = action.payload;
      },
    );
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.status = AuthStatus.Failed;
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
