import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "src/Api/baseURL";

interface IFormData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
}

const actAuthRegister = createAsyncThunk(
  "auth/actAuthRegister",
  async (formData: IFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await baseUrl.post("/api/v1/auth/signup", formData);
      return response.data;
    } catch (error) {
      //يفهم الايرور اللى جايله axios الشرط دا عملينه عشان ال
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        //  مش عارف يهندله axios لو ال
        return rejectWithValue("An unexpected error");
      }
    }
  }
);

export default actAuthRegister;
