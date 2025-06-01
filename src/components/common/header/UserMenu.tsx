import { Link } from "react-router-dom";
import { useAppDispatch } from "@store/hooks";
import { authLogout } from "@store/auth/authSlice";
import { clearCart } from "@store/cart/cartSlice";
import { wishlistCleanUp } from "@store/wishlist/wishlistSlice";
import { useState } from "react";

interface UserMenuProps {
  user: { name: string } | null;
  isMobile?: boolean;
  onClose?: () => void;
}

const UserMenu = ({  isMobile = false, onClose }: UserMenuProps) => {
  const dispatch = useAppDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    dispatch(authLogout());
    dispatch(clearCart());
    dispatch(wishlistCleanUp());
    if (onClose) onClose();
    setIsLoggingOut(false);
  };

  const MenuItem = ({ to, icon, children }: { to: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <Link
      to={to}
      className={`flex items-center ${isMobile ? 'font-medium px-3 py-2' : 'px-4 py-2 text-sm'} rounded-lg text-indigo-900 hover:text-purple-800 hover:bg-purple-50 transition-colors duration-200`}
      onClick={onClose}
    >
      <span className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'} mr-2 text-indigo-600`}>
        {icon}
      </span>
      {children}
    </Link>
  );

  return (
    <div className={`${isMobile ? 'pl-4 space-y-1 pt-1' : 'absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-10 border border-gray-100'}`}>
      <MenuItem
        to="/profile"
        icon={
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        }
      >
        Account
      </MenuItem>
      <MenuItem
        to="/profile/orders"
        icon={
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
        }
      >
        Orders
      </MenuItem>
      {!isMobile && <div className="border-t border-gray-200 my-1"></div>}
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={`w-full flex items-center ${isMobile ? 'font-medium px-3 py-2' : 'px-4 py-2 text-sm'} rounded-lg text-indigo-900 hover:text-purple-800 hover:bg-purple-50 transition-colors duration-200`}
      >
        {isLoggingOut ? (
          <>
            <svg className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'} mr-2 text-red-500 animate-spin`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Loading...
          </>
        ) : (
          <>
            <svg className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'} mr-2 text-red-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Logout
          </>
        )}
      </button>
    </div>
  );
};

export default UserMenu; 