import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaArrowRight } from 'react-icons/fa';

type HoveredButtonType = 'home' | 'products' | null;

const ErrorPage = () => {
  const [hoveredButton, setHoveredButton] = useState<HoveredButtonType>(null);
  const navigate = useNavigate();

  const handleNavigation = (path: string): void => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950 text-white flex items-center justify-center p-4">
      {/* Background elements - adjusted for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 md:top-20 md:left-20 w-32 h-32 md:w-64 md:h-64 rounded-full bg-purple-900/20 blur-xl md:blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-40 h-40 md:w-80 md:h-80 rounded-full bg-indigo-900/20 blur-xl md:blur-3xl animate-float-delay"></div>
      </div>

      {/* Main content - responsive adjustments */}
      <div className="relative max-w-2xl w-full bg-gray-800/50 backdrop-blur-lg rounded-xl md:rounded-2xl overflow-hidden border border-gray-700/50 shadow-lg md:shadow-2xl">
        <div className="p-6 sm:p-8 md:p-12 text-center">
          {/* Animation/Illustration - responsive size */}
          <div className="mb-6 md:mb-8 flex justify-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-600/30 border-2 border-purple-400/30 flex items-center justify-center">
              <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-purple-300">404</span>
            </div>
          </div>

          {/* Heading - responsive text size */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-200">
            Page Not Found
          </h1>

          {/* Description - responsive text and spacing */}
          <p className="text-gray-300 mb-6 md:mb-8 text-base sm:text-lg max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved.
            Don't worry, we'll help you find what you need.
          </p>

          {/* Buttons - responsive layout and sizing */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button
              onClick={() => handleNavigation('/')}
              onMouseEnter={() => setHoveredButton('home')}
              onMouseLeave={() => setHoveredButton(null)}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg md:rounded-xl font-medium sm:font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${hoveredButton === 'home'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 shadow-md sm:shadow-lg -translate-y-0.5 sm:-translate-y-1'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600'
                }`}
            >
              <FaHome className="text-sm sm:text-base" />
              Back to Home
            </button>

            <button
              onClick={() => handleNavigation('/products/allProduct')}
              onMouseEnter={() => setHoveredButton('products')}
              onMouseLeave={() => setHoveredButton(null)}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg md:rounded-xl font-medium sm:font-semibold flex items-center justify-center gap-2 transition-all duration-300 border ${hoveredButton === 'products'
                  ? 'border-purple-400 bg-gray-700/50 -translate-y-0.5 sm:-translate-y-1'
                  : 'border-gray-600 bg-gray-800/30'
                }`}
            >
              Browse Products
              <FaArrowRight className="text-sm sm:text-base" />
            </button>
          </div>

          {/* Footer note - responsive text and spacing */}
          <div className="mt-8 md:mt-10 pt-4 md:pt-6 border-t border-gray-700/50">
            <p className="text-gray-400 text-xs sm:text-sm">
              If you believe this is an error, please <button className="text-purple-300 hover:underline font-medium">contact us</button> and we'll fix it immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;