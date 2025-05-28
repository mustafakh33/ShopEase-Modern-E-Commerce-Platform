import { useState } from "react";
import { ICartItem } from "src/types/cartItem";
import CartItem from "./CartItem";
import { useAppDispatch } from "@store/hooks";
import actGetClearCart from "@store/cart/thunk/actGetClearCart";
import { toast } from "react-toastify";
import ReusableModal from "@components/common/ReusableModal";

const CartItemList = ({
  cartItems,
  totalQuantity,
}: {
  cartItems: ICartItem[];
  totalQuantity: number;
}) => {
  const dispatch = useAppDispatch();
  const [showClearModal, setShowClearModal] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const renderList = cartItems.map((cartItem) => (
    <CartItem key={cartItem.product._id} {...cartItem} />
  ));

  const clearCartHandler = async () => {
    setShowClearModal(true);
  };

  const confirmClearCart = async () => {
    setIsClearing(true);
    try {
      await dispatch(actGetClearCart()).unwrap();
      toast.success("Cart cleared successfully!");
    } catch (error) {
      toast.error("Failed to clear cart. Please try again.");
      console.error("Error clearing cart:", error);
    } finally {
      setIsClearing(false);
      setShowClearModal(false);
    }
  };

  return (
    <div>
      <ReusableModal
        show={showClearModal}
        title="Clear Cart"
        content={
          <div className="flex items-start">
            <svg className="h-5 w-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="ml-3 text-gray-600">
              Are you sure you want to clear your cart? This action cannot be undone.
            </p>
          </div>
        }
        loading={isClearing}
        onClose={() => setShowClearModal(false)}
        onConfirm={confirmClearCart}
        confirmLabel="Clear Cart"
        confirmVariant="danger"
      />

      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Shopping Cart</h2>
            <p className="text-sm text-gray-500 mt-1">
              {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={clearCartHandler}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear Cart
            </button>
          )}
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {renderList}
      </div>
    </div>
  );
};

export default CartItemList;