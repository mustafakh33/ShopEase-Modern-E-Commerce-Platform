import { useState } from "react";
import { useAppDispatch } from "@store/hooks";
import actGetClearCart from "@store/cart/thunk/actGetClearCart";
import actCreateOrder from "@store/orders/thunk/actCreateOrder";
import { useNavigate } from "react-router-dom";
import ReusableModal from "@components/common/ReusableModal";

const CartSubtotalPrice = ({
  totalCartPrice,
  cartId,
}: {
  totalCartPrice: number;
  cartId: string;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const modalHandler = () => {
    setShowModal(!showModal);
    setError(null);
  };

  const placeOrderHandler = async () => {
    setLoading(true);
    setError(null);
    try {
      await dispatch(actCreateOrder(cartId)).unwrap();
      await dispatch(actGetClearCart()).unwrap();
      setShowModal(false);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const buyNowHandler = () => {
    navigate("/payment");
  };

  return (
    <>
      <ReusableModal
        show={showModal}
        title="Confirm Order"
        content={
          <>
            <div className="p-2 sm:p-4 bg-gray-50 rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Subtotal:</span>
                <span className="text-xl font-bold text-purple-900">{totalCartPrice} EGP</span>
              </div>
            </div>
            <p className="text-gray-600">Are you sure you want to place this order?</p>
          </>
        }
        loading={loading}
        error={error}
        onClose={modalHandler}
        onConfirm={placeOrderHandler}
        confirmLabel="Place Order"
      />

      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0">
          <span className="text-gray-700 text-lg">Subtotal:</span>
          <span className="text-2xl font-bold text-purple-900 ml-2">{totalCartPrice} EGP</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={modalHandler}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2.5 px-6 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Place Order
          </button>
          <button
            onClick={buyNowHandler}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-2.5 px-6 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSubtotalPrice;