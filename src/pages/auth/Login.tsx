import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useNavigate, useSearchParams, Navigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signInType } from "@validations/signInSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import actAuthLogin from "@store/auth/thunk/actAuthLogin";
import { useEffect } from "react";
import { resetUI } from "@store/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector((state) => state.auth);

  const [searchParams, setSearchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInType>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<signInType> = (data) => {
    if (searchParams.get("message")) {
      setSearchParams("");
    }
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  useEffect(() => {
    dispatch(resetUI()); 
    return () => {
      dispatch(resetUI()); 
    };
  }, [dispatch]); 

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-700 to-purple-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl relative p-6 md:p-8 border border-gray-100 flex flex-col min-h-0">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-t-xl"></div>
        <h2 className="text-center mb-8 text-4xl font-extrabold text-indigo-900 leading-tight">
          Welcome Back
        </h2>
        {searchParams.get("message") === "account_created" && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-3 rounded-lg relative mb-6 shadow-sm animate-fade-in" role="alert">
            <p className="font-medium">Success!</p>
            <span className="block text-sm">Your account has been created successfully. Please login.</span>
          </div>
        )}
        {searchParams.get("message") === "login_required" && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-5 py-3 rounded-lg relative mb-6 shadow-sm animate-fade-in" role="alert">
            <p className="font-medium">Heads Up!</p>
            <span className="block text-sm">You need to login to access this content.</span>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-lg relative mb-6 shadow-sm animate-fade-in" role="alert">
            <p className="font-medium">Login Failed</p>
            <span className="block text-sm">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-indigo-800 text-xs font-semibold mb-1">
              Email Address
            </label>
            <input
              id="email"
              className={`block w-full px-3 py-2 rounded-md text-sm text-gray-800 border ${errors.email ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-indigo-600'} focus:ring-1 focus:ring-indigo-200 outline-none transition duration-200`}
              type="email"
              placeholder="you@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
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
            <div className="text-right mt-1 text-xs">
                <Link
                  to="/forgot-password"
                  className="text-indigo-700 hover:text-indigo-900 hover:underline transition-colors duration-200"
                >
                  Forgot password?
                </Link>
            </div>
          </div>
          <button
            className="w-full py-2.5 bg-gradient-to-br from-indigo-700 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-out flex items-center justify-center text-base disabled:opacity-60 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading === "pending"}
          >
            {loading === "pending" ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
          <div className="text-center mt-5 text-gray-600 text-xs">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-700 font-bold hover:text-indigo-900 hover:underline transition-colors duration-200"
            >
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;