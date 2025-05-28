import { Link } from "react-router-dom";

const DesktopNav = () => {
  return (
    <nav className="hidden lg:flex items-center">
      <div className="flex items-center">
        <Link
          to="/"
          className="relative font-semibold px-3 py-2 rounded-lg text-indigo-800 hover:text-purple-700 hover:bg-purple-50 transition-all duration-200 group"
        >
          Home
          <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-purple-600 transition-all duration-300 transform -translate-x-1/2 group-hover:w-full"></span>
        </Link>
        <Link
          to="/categories"
          className="relative font-semibold px-3 py-2 rounded-lg text-indigo-800 hover:text-purple-700 hover:bg-purple-50 transition-all duration-200 group"
        >
          Categories
          <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-purple-600 transition-all duration-300 transform -translate-x-1/2 group-hover:w-full"></span>
        </Link>
        <Link
          to="/products/allProduct"
          className="relative font-semibold px-3 py-2 rounded-lg text-indigo-800 hover:text-purple-700 hover:bg-purple-50 transition-all duration-200 group"
        >
          Products
          <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-purple-600 transition-all duration-300 transform -translate-x-1/2 group-hover:w-full"></span>
        </Link>
        <Link
          to="/brands"
          className="relative font-semibold px-3 py-2 rounded-lg text-indigo-800 hover:text-purple-700 hover:bg-purple-50 transition-all duration-200 group"
        >
          Brands
          <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-purple-600 transition-all duration-300 transform -translate-x-1/2 group-hover:w-full"></span>
        </Link>
      </div>
    </nav>
  );
};

export default DesktopNav; 