import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "src/Api/baseURL";

interface IVerifyResetCodeFormData {
  resetCode: string;
}

export const actAuthVerifyResetCode = createAsyncThunk(
  "auth/actAuthVerifyResetCode",
  async (formData: IVerifyResetCodeFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {

      const response = await baseUrl.post(
        "/api/v1/auth/verifyResetCode",
        formData 
      );
      return response.data; 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue(
          "An unexpected error occurred during code verification."
        );
      }
    }
  }
);
export default actAuthVerifyResetCode;
