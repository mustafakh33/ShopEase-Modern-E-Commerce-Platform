import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetAllProductInCart from "@store/cart/thunk/actGetAllProductInCart";
import actGetUserWishlist from "@store/wishlist/thunk/actGetUserWishlist";
import Logo from "./header/Logo";
import DesktopNav from "./header/DesktopNav";
import CartWishlistIcons from "./header/CartWishlistIcons";
import UserMenu from "./header/UserMenu";
import MobileMenu from "./header/MobileMenu";




const Header = () => {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const wishlistItems = useAppSelector((state) => state.Wishlist.allWishList);
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuOpen && !(event.target as Element).closest('.user-menu-container')) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  // Fetch cart and wishlist data
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      setIsLoading(true);
      try {
        await Promise.all([
          dispatch(actGetAllProductInCart()),
          dispatch(actGetUserWishlist())
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token, dispatch]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Close user menu when opening mobile menu
      setUserMenuOpen(false);
    }
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };


  return (
    <>
      {/* Custom CSS for advanced animations */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
        }

        @keyframes mobileMenuSlide {
          from {
            opacity: 0;
            transform: translateY(-20px);
            max-height: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            max-height: 600px; /* Adjust based on content height */
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes hamburgerToX {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(90deg) scale(0.8); }
          100% { transform: rotate(180deg) scale(1); }
        }

        @keyframes xToHamburger {
          0% { transform: rotate(180deg); }
          50% { transform: rotate(90deg) scale(0.8); }
          100% { transform: rotate(0deg) scale(1); }
        }

        .dropdown-enter {
          animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dropdown-exit {
          animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mobile-menu-enter {
          animation: mobileMenuSlide 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .menu-item-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .menu-item-hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.1), transparent);
          transition: left 0.5s;
        }

        .menu-item-hover:hover::before {
          left: 100%;
        }

        .hamburger-icon {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hamburger-to-x {
          animation: hamburgerToX 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .x-to-hamburger {
          animation: xToHamburger 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .floating-animation {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }

        .pulse-ring {
          position: relative;
        }

        .pulse-ring::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(147, 51, 234, 0.2);
          animation: pulse-ring-animation 2s infinite;
          z-index: -1;
        }

        @keyframes pulse-ring-animation {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>

      <header className="fixed w-full z-50 bg-white/95 backdrop-blur-md shadow-xl border-b border-purple-100/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between py-3 md:py-4">
            <Logo />

            <DesktopNav />

            {/* Icons & User Menu - Desktop */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <CartWishlistIcons
                isLoading={isLoading}
                cartItems={cartItems}
                wishlistItems={wishlistItems}
              />

              {!token ? (
                <div className="flex space-x-3">
                  <Link
                    to="/auth/login"
                    className="font-medium px-4 py-2 rounded-lg text-indigo-800 hover:text-purple-700 hover:bg-purple-50 transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth/register"
                    className="font-bold px-5 py-2 rounded-lg shadow-md bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800 transition-all duration-200"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="relative user-menu-container">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-1 focus:outline-none group text-indigo-900 py-1 px-2 rounded-md hover:bg-purple-50 transition-colors duration-200"
                  >
                    <span className="font-semibold text-base group-hover:text-purple-800 transition-colors duration-200">
                      Hi, {user?.name.split(' ')[0]}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''} text-indigo-900 group-hover:text-purple-800`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {userMenuOpen && (
                    <UserMenu
                      user={user}
                      onClose={() => setUserMenuOpen(false)}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Mobile Right Icons & Burger Button */}
            <div className="flex items-center space-x-4 md:hidden">
              <CartWishlistIcons
                isLoading={isLoading}
                cartItems={cartItems}
                wishlistItems={wishlistItems}
                isMobile={true}
              />

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="focus:outline-none text-indigo-900 hover:text-purple-800 rounded-lg hover:bg-purple-50 transition-all duration-300 transform hover:scale-110"
                aria-label="Toggle menu"
              >
                <div className={`hamburger-icon ${isOpen ? 'hamburger-to-x' : 'x-to-hamburger'}`}>
                  {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </div>
              </button>
            </div>
          </div>

          <MobileMenu
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            user={user}
            token={token}
          />
        </div>
      </header>
    </>
  );
};

export default Header;