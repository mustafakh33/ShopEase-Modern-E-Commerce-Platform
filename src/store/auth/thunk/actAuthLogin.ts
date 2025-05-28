import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "src/Api/baseURL";

interface IFormData {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData: IFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await baseUrl.post<IResponse>(
        "/api/v1/auth/signin",
        formData
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue( error.response?.data.message || error.message
        );
      } else {
        return rejectWithValue("An unexpected error");
      }
    }
  }
);

export default actAuthLogin;
