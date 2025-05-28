import { useEffect, useState } from "react";

interface ProductProps {
  title: string;
  count?: number;
  quantity: number;
}

const useProduct = ({ title, count, quantity }: ProductProps) => {
  const [currentRemainingQuantity, setCurrentRemainingQuantity] = useState(
    quantity - (count ?? 0)
  );

  const quantityReachedToMax = currentRemainingQuantity <= 0;
  const truncatedTitle = title.split(" ").slice(0, 2).join(" ");

  useEffect(() => {
    setCurrentRemainingQuantity(quantity - (count ?? 0));
  }, [quantity, count]);

  return {
    quantityReachedToMax,
    truncatedTitle,
    currentRemainingQuantity,
  };
};

export default useProduct;
