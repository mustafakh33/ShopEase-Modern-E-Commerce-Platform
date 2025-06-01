// import { CartSubtotalPrice, CartItemList } from "@components/eCommerce";
// import { Loading } from "@components/feedback";
// import LottieHandler from "@components/feedback/LottieHandler";
// import actGetAllProductInCart from "@store/cart/thunk/actGetAllProductInCart";
// import { useAppDispatch, useAppSelector } from "@store/hooks";
// import { resetOrderStatus } from "@store/orders/ordersSlice";
// import { useEffect } from "react";
// import Pagination from "../components/common/Pagination";
// import usePagination from "@hooks/usePagination";

// const Cart = () => {
//   const { cartItems, loading, error } = useAppSelector((state) => state.cart);
//   const CreateOrderStatus = useAppSelector((state) => state.orders.loading);
//   const dispatch = useAppDispatch();

//   const { currentItems: currentCartItems, currentPage, totalPages, handlePageChange } = usePagination({
//     items: cartItems?.data?.products || [],
//     itemsPerPage: 5
//   });

//   useEffect(() => {
//     const promise = dispatch(actGetAllProductInCart());
//     return () => {
//       promise.abort();
//       dispatch(resetOrderStatus());
//     };
//   }, []);

//   const hasProducts = cartItems?.data?.products && cartItems.data.products.length > 0;

//   return (
//     <div className="min-h-screen bg-gray-50 pt-24 pb-16">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Cart Content */}
//         <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//           <Loading status={loading} error={error} type="cart">
//             {cartItems?.data?.products?.length ? (
//               <div className="divide-y divide-gray-100">
//                 <CartItemList
//                   cartItems={currentCartItems}
//                   totalQuantity={cartItems.numOfCartItems}
//                 />
                
//                 {cartItems.data.products.length > 5 && (
//                   <div className="px-6 py-4 bg-gray-50">
//                     <Pagination
//                       currentPage={currentPage}
//                       totalPages={totalPages}
//                       onPageChange={handlePageChange}
//                     />
//                   </div>
//                 )}
                
//                 <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
//                   <CartSubtotalPrice
//                     cartId={cartItems.cartId}
//                     totalCartPrice={cartItems.data.totalCartPrice}
//                   />
//                 </div>
//               </div>
//             ) : CreateOrderStatus === "succeeded" ? (
//               <div className="p-10 text-center">
//                 <LottieHandler 
//                   type="success" 
//                   message="Your order has been placed successfully" 
//                   className="mx-auto"
//                 />
//               </div>
//             ) : (
//               <div className="p-10 text-center">
//                 <LottieHandler 
//                   type="empty" 
//                   message="Your Cart is empty" 
//                   className="mx-auto"
//                 />
//               </div>
//             )}
//           </Loading>
//         </div>

//         {/* Recommended Products */}
//         {!loading && !error && !hasProducts && CreateOrderStatus !== "succeeded" && (
//           <div className="bg-gray-50 py-12 mt-12 rounded-lg border border-gray-200">
//             <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//               <h3 className="text-xl font-semibold mb-4 text-gray-800">
//                 You Might Also Like
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 Discover products to add to your cart
//               </p>
//               <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
//                 Browse Products
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;


import { CartSubtotalPrice, CartItemList } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import LottieHandler from "@components/feedback/LottieHandler";
import actGetAllProductInCart from "@store/cart/thunk/actGetAllProductInCart";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { resetOrderStatus } from "@store/orders/ordersSlice";
import { useEffect, useState } from "react";
import Pagination from "../components/common/Pagination";
import usePagination from "@hooks/usePagination";
import ReusableModal from "@components/common/ReusableModal";
import actGetClearCart from "@store/cart/thunk/actGetClearCart";
import { toast } from "react-toastify";
import { clearCart } from "@store/cart/cartSlice";

const Cart = () => {
  const { cartItems, loading, error } = useAppSelector((state) => state.cart);
  const CreateOrderStatus = useAppSelector((state) => state.orders.loading);

  const dispatch = useAppDispatch();
  const [showClearModal, setShowClearModal] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const { currentItems: currentCartItems, currentPage, totalPages, handlePageChange } = usePagination({
    items: cartItems?.data?.products || [],
    itemsPerPage: 5
  });
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

  useEffect(() => {
    const promise = dispatch(actGetAllProductInCart());
    return () => {
      promise.abort();
      dispatch(resetOrderStatus());
      dispatch(clearCart())
    };
  }, []);

  const hasProducts = cartItems?.data?.products && cartItems.data.products.length > 0;
  const totalQuantity = cartItems?.numOfCartItems || 0; 

  return (
    <>
    
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

    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cart Header (Title and Clear Cart Button) */}
        <div className="px-6 py-4 bg-white rounded-t-lg shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Shopping Cart</h2>
              <p className="text-sm text-gray-500 mt-1">
                {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            {hasProducts && (
              <button
                onClick={() => setShowClearModal(true)} // تحتاج إلى تعريف state لـ setShowClearModal هنا أو تمريرها
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

        {/* Cart Content */}
        <div className="bg-white rounded-b-lg shadow-sm border-b border-l border-r border-gray-200 overflow-hidden">
          <Loading status={loading} error={error} type="cart">
            {cartItems?.data?.products?.length ? (
              <div className="divide-y divide-gray-100">
                <CartItemList
                  cartItems={currentCartItems}
                  // totalQuantity={cartItems.numOfCartItems} // تم نقلها إلى الأعلى
                />

                {cartItems.data.products.length > 5 && (
                  <div className="px-6 py-4 bg-gray-50">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}

                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <CartSubtotalPrice
                    cartId={cartItems.cartId}
                    totalCartPrice={cartItems.data.totalCartPrice}
                  />
                </div>
              </div>
            ) : CreateOrderStatus === "succeeded" ? (
              <div className="p-10 text-center">
                <LottieHandler
                  type="success"
                  message="Your order has been placed successfully"
                  className="mx-auto"
                />
              </div>
            ) : (
              <div className="p-10 text-center">
                <LottieHandler
                  type="empty"
                  message="Your Cart is empty"
                  className="mx-auto"
                />
              </div>
            )}
          </Loading>
        </div>

        {/* Recommended Products */}
        {!loading && !error && !hasProducts && CreateOrderStatus !== "succeeded" && (
          <div className="bg-gray-50 py-12 mt-12 rounded-lg border border-gray-200">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                You Might Also Like
              </h3>
              <p className="text-gray-600 mb-6">
                Discover products to add to your cart
              </p>
              <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
                Browse Products
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Cart;