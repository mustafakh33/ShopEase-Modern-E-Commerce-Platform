import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "src/Api/baseURL"; 

interface IResetPasswordFormData {
  email: string;
  newPassword: string;
}

const actAuthResetPassword = createAsyncThunk(
  "auth/actResetPassword",
  async (formData: IResetPasswordFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await baseUrl.put("/api/v1/auth/resetPassword", {
        email: formData.email,
        newPassword: formData.newPassword,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue(
          "An unexpected error occurred during password reset."
        );
      }
    }
  }
);

export default actAuthResetPassword;
