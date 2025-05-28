import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axios from "axios";
import baseUrl from "src/Api/baseURL";

interface IUpdatePasswordFormData {
  currentPassword: string;
  password: string;
  rePassword: string;
}

const actAuthUpdatePassword = createAsyncThunk(
  "auth/actAuthUpdatePassword",
  async (formData: IUpdatePasswordFormData, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const response = await baseUrl.put(
        "/api/v1/users/changeMyPassword",
        {
          currentPassword: formData.currentPassword,
          password: formData.password,
          rePassword: formData.rePassword,
        },
        {
          headers: { token: auth.token },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue(
          "An unexpected error occurred during password update."
        );
      }
    }
  }
);

export default actAuthUpdatePassword;
