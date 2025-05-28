import { useNavigate } from "react-router-dom";

interface CartWishlistIconsProps {
  isLoading: boolean;
  cartItems: { numOfCartItems: number } | null;
  wishlistItems: { count: number } | null;
  isMobile?: boolean;
}

const CartWishlistIcons = ({ isLoading, cartItems, wishlistItems, isMobile = false }: CartWishlistIconsProps) => {
  const navigate = useNavigate();

  const IconWrapper = ({ children, onClick, type }: { children: React.ReactNode; onClick: () => void; type: 'wishlist' | 'cart' }) => (
    <div
      className={`cursor-pointer ${isMobile ? 'relative' : 'group flex flex-col items-center relative'}`}
      onClick={onClick}
    >
      {children}
      {!isMobile && (
        <span className="text-xs mt-1 text-indigo-700 group-hover:text-purple-700 hidden lg:block transition-colors duration-200">
          {type === 'wishlist' ? "Wishlist" : "Cart"}
        </span>
      )}
    </div>
  );

  const Badge = ({ count }: { count: number }) => (
    isLoading ? (
      <div className="absolute -top-2 -right-2 h-4 w-4 lg:h-5 lg:w-5 flex items-center justify-center rounded-full text-xs shadow-md bg-purple-700 animate-pulse">
        <div className="h-2 w-2 lg:h-3 lg:w-3 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
      </div>
    ) : (
      <div className="absolute -top-2 -right-2 h-4 w-4 lg:h-5 lg:w-5 flex items-center justify-center rounded-full text-xs font-bold shadow-md bg-purple-700 text-white">
        {count}
      </div>
    )
  );

  return (
    <>
      <IconWrapper onClick={() => navigate("/wishlist")} type="wishlist">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${isMobile ? 'text-indigo-900' : 'text-indigo-800 group-hover:text-red-500 transition-colors duration-200'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <Badge count={wishlistItems?.count || 0} />
        </div>
      </IconWrapper>

      <IconWrapper onClick={() => navigate("/cart")} type="cart">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${isMobile ? 'text-indigo-900' : 'text-indigo-800 group-hover:text-purple-700 transition-colors duration-200'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <Badge count={cartItems?.numOfCartItems || 0} />
        </div>
      </IconWrapper>
    </>
  );
};

export default CartWishlistIcons; 