import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordType } from "@validations/passwordSchemas";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { resetUI } from "@store/auth/authSlice";
import actAuthResetPassword from "@store/auth/thunk/actAuthResetPassword";


const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const initialEmail = searchParams.get("email") || "";
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ResetPasswordType>({
    mode: "onBlur",
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: initialEmail,
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    dispatch(resetUI());

    if (initialEmail && !errors.email) {
      setValue("email", initialEmail);
    }
    if (!token) {

    }

    return () => {
      dispatch(resetUI());
    };
  }, [dispatch, initialEmail, token, setValue, errors.email]);

  const onSubmit: SubmitHandler<ResetPasswordType> = async (data) => {
    const payload = {
      email: data.email,
      newPassword: data.newPassword,
    };

    const resultAction = await dispatch(actAuthResetPassword(payload));

    if (actAuthResetPassword.fulfilled.match(resultAction)) {
      reset({ email: data.email, newPassword: "", confirmPassword: "" });

      navigate("/login?message=password_reset_success");

    } else {
    }
  };

  const currentLoading = loading === "pending";
  const currentError = error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-700 to-purple-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl relative p-6 md:p-8 border border-gray-100 flex flex-col min-h-0">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-t-xl"></div>

        <h2 className="text-center mb-6 text-3xl font-extrabold text-indigo-900 leading-tight">
          Reset Your Password
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Enter your new password below.
        </p>

        {currentError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg relative mb-4 text-sm shadow-sm animate-fade-in" role="alert">
            <p className="font-medium">Error!</p>
            <span className="block text-xs">{currentError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex-grow overflow-y-auto custom-scrollbar">
          <div>
            <label htmlFor="email" className="block text-indigo-800 text-xs font-semibold mb-1">
              Email Address
            </label>
            <input
              id="email"
              className={`block w-full px-3 py-2 rounded-md text-sm text-gray-800 border ${errors.email ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-indigo-600'} focus:ring-1 focus:ring-indigo-200 outline-none transition duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed`}
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              disabled
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-indigo-800 text-xs font-semibold mb-1">
              New Password
            </label>
            <input
              id="newPassword"
              className={`block w-full px-3 py-2 rounded-md text-sm text-gray-800 border ${errors.newPassword ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-indigo-600'} focus:ring-1 focus:ring-indigo-200 outline-none transition duration-200`}
              type="password"
              placeholder="••••••••"
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <p className="text-red-600 text-xs mt-1">{errors.newPassword.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              8+ chars, uppercase, lowercase, number.
            </p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-indigo-800 text-xs font-semibold mb-1">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              className={`block w-full px-3 py-2 rounded-md text-sm text-gray-800 border ${errors.confirmPassword ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-indigo-600'} focus:ring-1 focus:ring-indigo-200 outline-none transition duration-200`}
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-xs mt-1">{errors.confirmPassword.message}</p>
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
                Resetting Password...
              </>
            ) : (
              "Reset Password"
            )}
          </button>

          <div className="text-center mt-5 text-gray-600 text-xs">
            Remembered your password?{" "}
            <Link to="/login" className="text-indigo-700 font-bold hover:text-indigo-900 hover:underline transition-colors duration-200">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;