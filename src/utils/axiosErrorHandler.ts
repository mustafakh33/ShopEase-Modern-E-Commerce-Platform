import { isAxiosError } from "axios";

const axiosErrorHandler = (error: unknown) => {
  //يفهم الايرور اللى جايله axios الشرط دا عملينه عشان ال
  if (isAxiosError(error)) {
    return (
      error.response?.data || error.response?.data.message || error.message
    );
  } else {
    //  مش عارف يهندله axios لو ال
    return "An unexpected error";
  }
};

export default axiosErrorHandler;
