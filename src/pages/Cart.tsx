import { CartSubtotalPrice, CartItemList } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import LottieHandler from "@components/feedback/LottieHandler";
import actGetAllProductInCart from "@store/cart/thunk/actGetAllProductInCart";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { resetOrderStatus } from "@store/orders/ordersSlice";
import { useEffect } from "react";
import Pagination from "../components/common/Pagination";
import usePagination from "@hooks/usePagination";

const Cart = () => {
  const { cartItems, loading, error } = useAppSelector((state) => state.cart);
  const CreateOrderStatus = useAppSelector((state) => state.orders.loading);
  const dispatch = useAppDispatch();

  const { currentItems: currentCartItems, currentPage, totalPages, handlePageChange } = usePagination({
    items: cartItems?.data?.products || [],
    itemsPerPage: 5
  });

  useEffect(() => {
    const promise = dispatch(actGetAllProductInCart());
    return () => {
      promise.abort();
      dispatch(resetOrderStatus());
    };
  }, []);

  const hasProducts = cartItems?.data?.products && cartItems.data.products.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cart Content */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <Loading status={loading} error={error} type="cart">
            {cartItems?.data?.products?.length ? (
              <div className="divide-y divide-gray-100">
                <CartItemList
                  cartItems={currentCartItems}
                  totalQuantity={cartItems.numOfCartItems}
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
  );
};

export default Cart;