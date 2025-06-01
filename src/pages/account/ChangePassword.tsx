import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePasswordSchema, UpdatePasswordType } from "@validations/passwordSchemas";
import actAuthUpdatePassword from "@store/auth/thunk/actAuthUpdatePassword";

const ChangePassword = () => {
    const { loading, error } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [updatePasswordSuccess, setUpdatePasswordSuccess] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<UpdatePasswordType>({
        mode: "onBlur",
        resolver: zodResolver(updatePasswordSchema),
    });

    const onSubmitUpdatePassword: SubmitHandler<UpdatePasswordType> = async (data) => {
        setUpdatePasswordSuccess(null);
        const resultAction = await dispatch(actAuthUpdatePassword(data));

        if (actAuthUpdatePassword.fulfilled.match(resultAction)) {
            setUpdatePasswordSuccess("Password updated successfully!");
            reset();
        } else {
            setUpdatePasswordSuccess(null);
        }
    };

    const currentLoading = loading === "pending";

    return (
        <div className="bg-white">
            {/* Adjusted padding for responsiveness based on screen size */}
            <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-4 sm:p-6 md:p-8">
                {/* Title font size already responsive - good! */}
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-800 mb-6 border-b pb-4 text-center">
                    Change Password
                </div>

                {updatePasswordSuccess && (
                    <div className="bg-green-50 border border-green-300 text-green-800 px-4 py-2 sm:px-5 sm:py-3 rounded-lg mb-4 sm:mb-6 flex items-center shadow-sm text-sm sm:text-base">
                        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <div>
                            {/* Adjusted font size for success message */}
                            <p className="font-semibold text-green-700 text-sm sm:text-base">Success!</p>
                            <p className="text-xs sm:text-sm">{updatePasswordSuccess}</p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-2 sm:px-5 sm:py-3 rounded-lg mb-4 sm:mb-6 flex items-center shadow-sm text-sm sm:text-base">
                        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <div>
                            {/* Adjusted font size for error message */}
                            <p className="font-semibold text-red-700 text-sm sm:text-base">Error!</p>
                            <p className="text-xs sm:text-sm">{error}</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmitUpdatePassword)} className="space-y-4 sm:space-y-6">
                    <div>
                        <label htmlFor="currentPassword" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Current Password
                        </label>
                        <input
                            id="currentPassword"
                            type="password"
                            placeholder="Enter your current password"
                            className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border ${errors.currentPassword ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'} transition-all duration-200 outline-none shadow-sm text-sm`}
                            {...register("currentPassword")}
                        />
                        {errors.currentPassword && <p className="text-red-600 text-xs mt-1">{errors.currentPassword.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            New Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your new password"
                            className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border ${errors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'} transition-all duration-200 outline-none shadow-sm text-sm`}
                            {...register("password")}
                        />
                        {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
                        <p className="text-xs text-gray-500 mt-1 sm:mt-2">
                            Must be at least 8 characters, including uppercase, lowercase, and numbers.
                        </p>
                    </div>

                    <div>
                        <label htmlFor="rePassword" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Confirm New Password
                        </label>
                        <input
                            id="rePassword"
                            type="password"
                            placeholder="Confirm your new password"
                            className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border ${errors.rePassword ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'} transition-all duration-200 outline-none shadow-sm text-sm`}
                            {...register("rePassword")}
                        />
                        {errors.rePassword && <p className="text-red-600 text-xs mt-1">{errors.rePassword.message}</p>}
                    </div>

                    <div className="pt-2 sm:pt-4">
                        <button
                            type="submit"
                            disabled={currentLoading}
                            className="w-full px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-sm sm:text-base"
                        >
                            {currentLoading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Updating...
                                </>
                            ) : (
                                "Update Password"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;