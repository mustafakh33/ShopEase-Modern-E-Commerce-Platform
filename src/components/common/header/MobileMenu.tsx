import { Link } from "react-router-dom";
import { useState } from "react";
import UserMenu from "./UserMenu";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string } | null;
  token: string | null;
}

const MobileMenu = ({ isOpen, onClose, user, token }: MobileMenuProps) => {
  const [mobileUserMenuOpen, setMobileUserMenuOpen] = useState(false);

  const toggleMobileUserMenu = () => {
    setMobileUserMenuOpen(!mobileUserMenuOpen);
  };

  const MenuItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link
      to={to}
      className="menu-item-hover block font-medium px-4 py-3 rounded-lg text-indigo-900 hover:text-purple-800 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-300 transform hover:scale-[1.02]"
      onClick={onClose}
    >
      {children}
    </Link>
  );

  return (
    <div
      className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
        isOpen ? "max-h-screen opacity-100 pb-4 pt-2" : "max-h-0 opacity-0 pb-0 pt-0"
      }`}
    >
      <div
        className={`glass-effect rounded-xl p-4 shadow-2xl border border-purple-100/50 transform transition-all duration-500 ${
          isOpen ? "translate-y-0 scale-100" : "-translate-y-4 scale-95"
        } mobile-menu-enter`}
      >
        <div className="space-y-1">
          <MenuItem to="/">Home</MenuItem>
          <MenuItem to="/categories">Categories</MenuItem>
          <MenuItem to="/products/allProduct">Products</MenuItem>
          <MenuItem to="/brands">Brands</MenuItem>

          <div className="pt-3 border-t border-purple-100 mt-3">
            {!token ? (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/auth/login"
                  className="text-center font-medium px-4 py-3 rounded-lg text-indigo-900 hover:text-purple-800 hover:bg-purple-50 transition-colors duration-200"
                  onClick={onClose}
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="text-center font-bold px-5 py-3 rounded-lg shadow-md bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800 transition-all duration-200"
                  onClick={onClose}
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between px-4 py-2 bg-purple-50 rounded-lg">
                  <span className="text-base font-semibold text-purple-800">
                    Hi, {user?.name.split(" ")[0]}!
                  </span>
                  <button
                    onClick={toggleMobileUserMenu}
                    className="focus:outline-none p-1 rounded-md hover:bg-purple-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transition-transform duration-200 ${
                        mobileUserMenuOpen ? "rotate-180" : ""
                      } text-indigo-900`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>

                {mobileUserMenuOpen && (
                  <UserMenu
                    user={user}
                    isMobile={true}
                    onClose={() => {
                      setMobileUserMenuOpen(false);
                      onClose();
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu; 