import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "src/Api/baseURL";

interface IForgotPasswordFormData {
  email: string;
}

const actAuthForgetPassword = createAsyncThunk(
  "auth/actForgotPassword",
  async (formData: IForgotPasswordFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      // API endpoint from your screenshot: /api/v1/auth/forgotPasswords
      const response = await baseUrl.post(
        "/api/v1/auth/forgotPasswords",
        formData
      );
      // Assuming a successful response for forgot password might contain a success message
      return response.data; // Or a specific success message if your backend sends one
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue(
          "An unexpected error occurred during forgot password request."
        );
      }
    }
  }
);

export default actAuthForgetPassword;
