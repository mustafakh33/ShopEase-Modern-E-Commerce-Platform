import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import actAuthRegister from "@store/auth/thunk/actAuthRegister";
import { resetUI } from "@store/auth/authSlice";
import { useEffect } from "react";
import { signUpSchema, signUpType } from "@validations/signUpSchema";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<signUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

  const {
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  } = useCheckEmailAvailability();

  const onSubmit: SubmitHandler<signUpType> = async (data) => {
    const { firstName, lastName, email, password, confirmPassword } = data;
    const name = `${firstName} ${lastName}`;
    dispatch(
      actAuthRegister({ name, email, password, rePassword: confirmPassword })
    )
      .unwrap()
      .then(() => {
        navigate("/login?message=account_created");
      });
  };

  const emailOnBlurHandler = async (event: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const value = event.target.value;
    const { isDirty, invalid } = getFieldState("email");

    if (isDirty && invalid === false && enteredEmail !== value) {
      checkEmailAvailability(value);
    }

    if (isDirty && invalid && enteredEmail) {
      resetCheckEmailAvailability();
    }
  };

  useEffect(() => {
    dispatch(resetUI());
    return () => {
      dispatch(resetUI());
    };
  }, []);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-700 to-purple-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl relative p-6 md:p-8 border border-gray-100 flex flex-col min-h-0">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-t-xl"></div>

        <h2 className="text-center mb-6 text-3xl font-extrabold text-indigo-900 leading-tight">
          Create Your Account
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg relative mb-4 text-sm shadow-sm animate-fade-in" role="alert">
            <p className="font-medium">Registration Failed</p>
            <span className="block text-xs">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex-grow overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-indigo-800 text-xs font-semibold mb-1">
                First Name
              </label>
              <input
                id="firstName"
                className={`block w-full px-3 py-2 rounded-md text-sm text-gray-800 border ${errors.firstName ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-indigo-600'} focus:ring-1 focus:ring-indigo-200 outline-none transition duration-200`}
                type="text"
                placeholder="John"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-red-600 text-xs mt-1">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-indigo-800 text-xs font-semibold mb-1">
                Last Name
              </label>
              <input
                id="lastName"
                className={`block w-full px-3 py-2 rounded-md text-sm text-gray-800 border ${errors.lastName ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-indigo-600'} focus:ring-1 focus:ring-indigo-200 outline-none transition duration-200`}
                type="text"
                placeholder="Doe"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-red-600 text-xs mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-indigo-800 text-xs font-semibold mb-1">
              Email Address
            </label>
            <input
              id="email"
              className={`block w-full px-3 py-2 rounded-md text-sm text-gray-800 border ${errors.email || emailAvailabilityStatus === "notAvailable" || emailAvailabilityStatus === "failed" ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-indigo-600'} focus:ring-1 focus:ring-indigo-200 outline-none transition duration-200`}
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              onBlur={emailOnBlurHandler}
              disabled={emailAvailabilityStatus === "checking"}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
            )}
            {emailAvailabilityStatus === "notAvailable" && !errors.email && (
              <p className="text-red-600 text-xs mt-1">This email is already in use.</p>
            )}
            {emailAvailabilityStatus === "failed" && !errors.email && (
              <p className="text-red-600 text-xs mt-1">Error checking email availability.</p>
            )}
            {emailAvailabilityStatus === "checking" && (
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                 <svg className="animate-spin -ml-0.5 mr-1.5 h-3 w-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Checking email availability...
              </p>
            )}
            {emailAvailabilityStatus === "available" && (
              <p className="text-emerald-600 text-xs mt-1">Email is available!</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-indigo-800 text-xs font-semibold mb-1">
              Password
            </label>
            <input
              id="password"
              className={`block w-full px-3 py-2 rounded-md text-sm text-gray-800 border ${errors.password ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-indigo-600'} focus:ring-1 focus:ring-indigo-200 outline-none transition duration-200`}
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              8+ chars, uppercase, lowercase, number.
            </p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-indigo-800 text-xs font-semibold mb-1">
              Confirm Password
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
            disabled={emailAvailabilityStatus === "checking" || loading === "pending"}
          >
            {loading === "pending" ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : (
              "Register Now"
            )}
          </button>

          <div className="text-center mt-5 text-gray-600 text-xs">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-700 font-bold hover:text-indigo-900 hover:underline transition-colors duration-200">
              Sign In
            </Link>
          </div>

          <div className="text-center mt-3 text-gray-500 text-[0.65rem] leading-tight">
            By registering, you agree to our{" "}
            <span className="text-indigo-700 font-medium cursor-pointer hover:underline">Terms of Service</span> and{" "}
            <span className="text-indigo-700 font-medium cursor-pointer hover:underline">Privacy Policy</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;