import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";

import actGetProductsByCategoryId from "../store/products/thunk/actGetProductsByCategoryId";
import { productCleanUp } from "../store/products/productsSlice";

const useProducts = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  console.log(params)

  const { records, loading, error } = useAppSelector((state) => state.products);
  const cartItems = useAppSelector(
    (state) => state.cart.cartItems?.data.products || []
  );
  const userAccessToken = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    const promise = dispatch(
      actGetProductsByCategoryId(params.categoryId as string || "allProduct")
    );

    return () => {
      dispatch(productCleanUp());
      promise.abort();
    };
  }, [dispatch, params.categoryId]);

  const updatedRecords = records.map((product) => {
    const cartItem = cartItems.find((item) => item.product._id === product._id);
    return {
      ...product,
      count: cartItem ? cartItem.count : 0,
      isAuthenticated: userAccessToken ? true : false,
    };
  });

  const categoryName =
    params.categoryId === "allProduct"
      ? "All Products"
      : records.length > 0
      ? records[0].category.name
      : "";

  return { categoryName, loading, error, updatedRecords };
};

export default useProducts;
