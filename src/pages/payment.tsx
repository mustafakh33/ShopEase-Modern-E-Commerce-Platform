import { useEffect } from "react";
import usePaymentForm from "@hooks/usePaymentForm";

const Payment = () => {
  const {
    shippingAddress,
    handleInputChange,
    handleSubmit,
    loading,
    url,
    error,
  } = usePaymentForm();

  useEffect(() => {
    if (url) {
      window.location.href = url;
    }
  }, [url]);

  const handleBackToCart = () => {
    // يمكنك تعديل هذا المسار حسب route الخاص بك
    window.history.back(); // أو يمكنك استخدام router.push('/cart') إذا كنت تستعمل Next.js
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-sm sm:max-w-md lg:max-w-lg w-full bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 sm:p-4 lg:p-5 text-white">
          {/* Back to Cart Button */}
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <button
              onClick={handleBackToCart}
              className="flex items-center text-white hover:text-gray-200 transition-colors duration-200 text-xs sm:text-sm lg:text-base font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden xs:inline">Back to Cart</span>
              <span className="xs:hidden">Back</span>
            </button>
            <div className="text-xs sm:text-sm opacity-75">Step 2 of 2</div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="hidden sm:inline">Complete Your Purchase</span>
              <span className="sm:hidden">Complete Purchase</span>
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Shipping Information Section */}
            <div>
              <div className="flex items-center mb-3 sm:mb-4 text-gray-800">
                <div className="bg-blue-100 rounded-full p-1 sm:p-1.5 mr-2 sm:mr-3 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold">Shipping Information</h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {/* Address Details Field */}
                <div>
                  <label htmlFor="details" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Address Details
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    rows={2}
                    value={shippingAddress.details}
                    onChange={handleInputChange}
                    placeholder="Enter your complete address details"
                    required
                    className="w-full px-3 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base rounded-md border border-gray-300 focus:ring-purple-500 focus:border-purple-500 transition-colors text-gray-800 placeholder-gray-400"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={shippingAddress.phone}
                      onChange={handleInputChange}
                      placeholder="e.g., 01010700999"
                      pattern="[0-9]+"
                      required
                      className="w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base rounded-md border border-gray-300 focus:ring-purple-500 focus:border-purple-500 transition-colors text-gray-800 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* City Field */}
                <div>
                  <label htmlFor="city" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    City
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleInputChange}
                      placeholder="Enter your city"
                      required
                      className="w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base rounded-md border border-gray-300 focus:ring-purple-500 focus:border-purple-500 transition-colors text-gray-800 placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-2 sm:p-3 rounded-md text-xs sm:text-sm text-red-700 font-medium" role="alert">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading === "pending"}
              className="w-full bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-800 hover:to-blue-800 text-white font-medium py-2.5 sm:py-3 lg:py-3.5 px-4 sm:px-6 rounded-md transition-all duration-300 transform hover:-translate-y-0.5 shadow-md flex justify-center items-center text-sm sm:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
            >
              {loading === "pending" ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="hidden sm:inline">Processing Payment...</span>
                  <span className="sm:hidden">Processing...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="hidden sm:inline">Proceed to Secure Payment</span>
                  <span className="sm:hidden">Secure Payment</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;