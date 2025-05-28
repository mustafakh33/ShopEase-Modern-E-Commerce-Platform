import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import actGetBrands from "@store/brands/thunk/actGetBrands";
import { brandCleanUp } from "@store/brands/brandsSlice";

const useBrands = () => {
  const { allBrands, loading, error } = useAppSelector((state) => state.brands);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const promise = dispatch(actGetBrands());
    
    return () => {
      dispatch(brandCleanUp());
      promise.abort();
    };
  }, []);
  return { allBrands, loading, error };
};

export default useBrands;
