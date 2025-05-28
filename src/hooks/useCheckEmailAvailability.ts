import { useState } from "react";
import baseUrl from "src/Api/baseURL";

type TStatus = "idle" | "checking" | "available" | "notAvailable" | "failed";

const useCheckEmailAvailability = () => {
  //دى هتسجل حاله الايميل بتاعى state ال
  const [emailAvailabilityStatus, setEmailAvailabilityStatus] =
    useState<TStatus>("idle");
  //   دى اللى هتسجل الايميل الى المستخدم هيدخله state ال
  const [enteredEmail, setEnteredEmail] = useState<null | string>(null);

  const checkEmailAvailability = async (email: string) => {
    setEnteredEmail(email); 
    setEmailAvailabilityStatus("checking");
    try {
      const response = await baseUrl.get(`/api/v1/users?email=${email}`);
      console.log(response)
      // لو مرجع داتا معنى كدا الايميل دا مش موجود فى اقدر استخدمه
      if (!response.data.users.length) {
        setEmailAvailabilityStatus("available");
      } else {
        setEmailAvailabilityStatus("notAvailable");
      }
    } catch (error) {
      setEmailAvailabilityStatus("failed");
    }
  };
  const resetCheckEmailAvailability = () => {
    setEmailAvailabilityStatus("idle");
    setEnteredEmail(null);
  }
  return { emailAvailabilityStatus, enteredEmail, checkEmailAvailability ,resetCheckEmailAvailability};
};
export default useCheckEmailAvailability;
