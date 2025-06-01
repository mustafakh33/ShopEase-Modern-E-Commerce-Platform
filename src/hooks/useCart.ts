import { useState, useMemo } from "react";
import { useAppDispatch  } from "@store/hooks";
import { toast } from "react-toastify";

import actGetRemoveItemFromCart from "@store/cart/thunk/actGetRemoveItemFromCart";
import actGetUpdateCartProductQuantity from "@store/cart/thunk/actGetUpdateCartProductQuantity";

import { ICartItem } from "src/types/cartItem";

const useCart = ({ product, price, count }: ICartItem) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [itemCount, setItemCount] = useState(count);

  const totalPrice = useMemo(() => price * itemCount, [price, itemCount]);

  const handleRemoveCartItem = async () => {
    if (!product?._id) return;
    try {
      await dispatch(actGetRemoveItemFromCart(product._id)).unwrap();
      toast.success("Item removed from cart successfully!");
    } catch (error) {
      toast.error("Failed to remove item from cart. Please try again.");
    }
  };

  const onChangeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = Number(e.target.value);

    if (isNaN(numericValue) || numericValue < 1) {
      setItemCount(1);
    } else if (numericValue > product?.quantity) {
      setErrorMessage(`Maximum available quantity is ${product.quantity}.`);
      setItemCount(product.quantity);
      toast.warning(`Maximum available quantity is ${product.quantity}.`);
    } else {
      setErrorMessage("");
      setItemCount(numericValue);
    }
  };

  const handleUpdateCartQuantity = async () => {
    if (!product?._id) return;

    setIsLoading(true);
    try {
      await dispatch(
        actGetUpdateCartProductQuantity({
          id: product._id,
          body: { count: String(itemCount) },
        })
      ).unwrap();
      toast.success("Cart quantity updated successfully!");
    } catch (error) {
      toast.error("Failed to update cart quantity. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errorMessage,
    totalPrice,
    handleRemoveCartItem,
    onChangeCount,
    handleUpdateCartQuantity,
    itemCount,
  };
};

export default useCart;
