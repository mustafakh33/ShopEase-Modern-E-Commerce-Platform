import { useState } from "react";
import { useAppDispatch } from "@store/hooks";
import actGetAddProductToCart from "@store/cart/thunk/actGetAddProductToCart";
import actGetAllProductInCart from "@store/cart/thunk/actGetAllProductInCart";
import { toast } from "react-toastify";

const useAddToCart = (_id: string) => {
  const dispatch = useAppDispatch();
  const [isLoadingCart, setIsLoadingCart] = useState(false);

  const addToCartHandler = async () => {
    if (!_id) return;
    setIsLoadingCart(true);
    try {
      await dispatch(actGetAddProductToCart({ productId: _id })).unwrap();
      await dispatch(actGetAllProductInCart()).unwrap();
      toast.success("Product added to cart successfully!");
    } catch (error) {
      toast.error("Failed to add product to cart. Please try again.");
      console.error("Error adding to cart:", error);
    } finally {
      setIsLoadingCart(false);
    }
  };

  return {
    addToCartHandler,
    isLoadingCart,
  };
};

export default useAddToCart;
