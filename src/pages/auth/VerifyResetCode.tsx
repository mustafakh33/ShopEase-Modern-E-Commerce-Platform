import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyResetCodeSchema, VerifyResetCodeType } from "@validations/passwordSchemas";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { resetUI } from "@store/auth/authSlice";
import actAuthVerifyResetCode from "@store/auth/thunk/actAuthVerifyResetCode";

const VerifyResetCode = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const initialEmail = searchParams.get("email") || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyResetCodeType>({
    mode: "onBlur",
    resolver: zodResolver(verifyResetCodeSchema),
  });

  useEffect(() => {
    dispatch(resetUI());
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);

  const onSubmit: SubmitHandler<VerifyResetCodeType> = async (data) => {
    const payload = {
      resetCode: data.resetCode,
      // email: initialEmail, // Uncomment if your API requires email for verification
    };

    const resultAction = await dispatch(actAuthVerifyResetCode(payload));

    if (actAuthVerifyResetCode.fulfilled.match(resultAction)) {
      navigate(`/reset-password?email=${initialEmail}&verified=true`);
    } else {
      // Error is handled by Redux state
    }
  };

  const currentLoading = loading === "pending";
  const currentError = error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-700 to-purple-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl relative p-6 md:p-8 border border-gray-100 flex flex-col min-h-0">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-t-xl"></div>

        <h2 className="text-center mb-6 text-3xl font-extrabold text-indigo-900 leading-tight">
          Verify Reset Code
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          A 6-digit code has been sent to {initialEmail ? <span className="font-semibold text-indigo-700">{initialEmail}</span> : 'your email address'}. Please enter it below.
        </p>

        {currentError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg relative mb-4 text-sm shadow-sm animate-fade-in" role="alert">
            <p className="font-medium">Verification Failed!</p>
            <span className="block text-xs">{currentError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex-grow overflow-y-auto custom-scrollbar">
          <div>
            <label htmlFor="resetCode" className="block text-indigo-800 text-xs font-semibold mb-1">
              Verification Code
            </label>
            <input
              id="resetCode"
              className={`block w-full px-3 py-2 rounded-md text-sm text-gray-800 border text-center tracking-widest ${errors.resetCode ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-indigo-600'} focus:ring-1 focus:ring-indigo-200 outline-none transition duration-200`}
              type="text"
              maxLength={6}
              placeholder="••••••"
              {...register("resetCode")}
            />
            {errors.resetCode && (
              <p className="text-red-600 text-xs mt-1">{errors.resetCode.message}</p>
            )}
          </div>

          <button
            className="w-full py-2.5 bg-gradient-to-br from-indigo-700 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-out flex items-center justify-center text-base disabled:opacity-60 disabled:cursor-not-allowed"
            type="submit"
            disabled={currentLoading}
          >
            {currentLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
          </button>

          <div className="text-center mt-5 text-gray-600 text-xs">
            Didn't receive a code?{" "}
            <Link to="/forgot-password" className="text-indigo-700 font-bold hover:text-indigo-900 hover:underline transition-colors duration-200">
              Resend or Try Another Email
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyResetCode;