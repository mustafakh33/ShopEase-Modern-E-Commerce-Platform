import { TLoading } from "src/types/shared";
import { createSlice } from "@reduxjs/toolkit";
import actAuthRegister from "./thunk/actAuthRegister";
import actAuthLogin from "./thunk/actAuthLogin";
import { isString } from "src/types/guards";
import actAuthForgetPassword from "./thunk/actAuthForgetPassword";
import actAuthResetPassword from "./thunk/actAuthResetPassword";
import actAuthVerifyResetCode from "./thunk/actAuthVerifyResetCode";
import actAuthUpdatePassword from "./thunk/actAuthUpdatePassword";

interface IAuthState {
  user: {
    name: string;
    email: string;
  } | null;
  token: string | null;
  loading: TLoading;
  error: string | null;
}

const initialState: IAuthState = {
  user: null,
  token: null,
  loading: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUI: (state) => {
      state.loading = "idle";
      state.error = null;
    },
    authLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    // --- Register ---
    builder.addCase(actAuthRegister.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthRegister.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actAuthRegister.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // --- Login ---
    builder.addCase(actAuthLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    // --- Forgot Password ---
    builder.addCase(actAuthForgetPassword.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthForgetPassword.fulfilled, (state, _) => {
      state.loading = "succeeded";
      state.error = null;
    });
    builder.addCase(actAuthForgetPassword.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    // --- Reset Password ---
    builder.addCase(actAuthResetPassword.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthResetPassword.fulfilled, (state, _) => {
      state.loading = "succeeded";
      state.error = null;
    });
    builder.addCase(actAuthResetPassword.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    // --- Verify Reset Code ---
    builder.addCase(actAuthVerifyResetCode.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthVerifyResetCode.fulfilled, (state, _) => {
      state.loading = "succeeded";
      state.error = null;
    });
    builder.addCase(actAuthVerifyResetCode.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    // --- Update Password ---
    builder.addCase(actAuthUpdatePassword.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthUpdatePassword.fulfilled, (state, _) => {
      state.loading = "succeeded";
      state.error = null;
    });
    builder.addCase(actAuthUpdatePassword.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      } else {
        state.error =
          "Failed to update password. Please check your current password.";
      }
    });
  },
});
export const { resetUI, authLogout } = authSlice.actions;
export default authSlice.reducer;
