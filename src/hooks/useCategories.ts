import { useEffect } from "react";
import actGetCategories from "../store/categories/thunk/actGetCategories";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { categoriesRecordsCleanUp } from "@store/categories/categoriesSlice";

const useCategories = () => {
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    const promise = dispatch(actGetCategories());

    return () => {
      dispatch(categoriesRecordsCleanUp());
      promise.abort();
    };
  }, [dispatch]);
  
  return { records, loading, error };
};

export default useCategories;