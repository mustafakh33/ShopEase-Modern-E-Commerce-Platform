import { TLoading } from "src/types/shared";
import CategorySkeleton from "./skeletons/CategorySkeleton";
import ProductSkeleton from "./skeletons/ProductSkeleton";
import CartSkeleton from "./skeletons/CartSkeleton";
import BrandSkeleton from "./skeletons/BrandSkeleton";
import LottieHandler from "./LottieHandler";

const skeletonsTypes = {
  category: CategorySkeleton,
  product: ProductSkeleton,
  cart: CartSkeleton,
  brand:BrandSkeleton,
};

type LoadingProps = {
  status: TLoading;
  error: null | string;
  children: React.ReactNode;
  type?: keyof typeof skeletonsTypes;
};

const Loading = ({
  status,
  error,
  children,
  type = "category",
}: LoadingProps) => {
  const Component = skeletonsTypes[type];
  if (status === "pending") {
    return <Component />;
  }
  if (status === "failed") {
    return (
      <div>
        <LottieHandler type="error" message={error as string} />
      </div>
    );
  }
  return <div>{children}</div>;
};

export default Loading;
