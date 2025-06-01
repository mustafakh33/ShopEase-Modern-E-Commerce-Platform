import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { toast } from "react-toastify";
import actAddProductToWishList from "@store/wishlist/thunk/actAddProductToWishList";
import actGetUserWishlist from "@store/wishlist/thunk/actGetUserWishlist";
import actRemoveProductFromWishList from "@store/wishlist/thunk/actRemoveProductFromWishList";

const useWishlist = (_id: string) => {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.Wishlist.allWishList.data);

  const [isLoadingWishlist, setIsLoadingWishlist] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setIsWishlisted(wishlist.some((product) => product._id === _id));
  }, [wishlist, _id]);

  const addWishListHandler = async () => {
    if (!_id) return;
    setIsLoadingWishlist(true);
    try {
      await dispatch(actAddProductToWishList({ productId: _id })).unwrap();
      await dispatch(actGetUserWishlist()).unwrap();
      setIsWishlisted(true);
      toast.success("Product added to wishlist successfully!");
    } catch (error) {
      toast.error("Failed to add product to wishlist. Please try again.");
    } finally {
      setIsLoadingWishlist(false);
    }
  };

  const removeWishListHandler = async () => {
    if (!_id) return;
    setIsLoadingWishlist(true);
    try {
      await dispatch(actRemoveProductFromWishList(_id)).unwrap();
      setIsWishlisted(false);
      toast.success("Product removed from wishlist successfully!");
    } catch (error) {
      toast.error("Failed to remove product from wishlist. Please try again.");
    } finally {
      setIsLoadingWishlist(false);
    }
  };

  return {
    addWishListHandler,
    removeWishListHandler,
    isLoadingWishlist,
    isWishlisted,
  };
};

export default useWishlist;
