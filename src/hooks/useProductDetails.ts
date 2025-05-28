import { useState, useMemo } from "react";
import { useParams } from "react-router";
import { useAppSelector } from "src/store/hooks";
import useProducts from "@hooks/useProducts";
import useAddToCart from "@hooks/useAddToCart";
import useWishlist from "@hooks/useWishlist";

interface UseProductDetailsReturn {
  product: any; // Replace with proper type
  loading: string;
  error: string | null;
  selectedImage: number;
  showModal: boolean;
  showToast: boolean;
  toastMessage: string;
  toastType: "success" | "danger";
  isLoadingCart: boolean;
  isLoadingWishlist: boolean;
  isWishlisted: boolean;
  similarProducts: any[]; // Replace with proper type
  quantityReachedToMax: boolean;
  setSelectedImage: (index: number) => void;
  setShowModal: (show: boolean) => void;
  handleAddToCartWithFeedback: () => Promise<void>;
  handleWishlistWithFeedback: () => Promise<void>;
}

const useProductDetails = (): UseProductDetailsReturn => {
  const { id } = useParams();
  const { specificProduct: product, loading, error } = useAppSelector((state) => state.products);
  const { updatedRecords } = useProducts();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "danger">("success");


  const { addToCartHandler, isLoadingCart } = useAddToCart(id ?? "");

  const {
    addWishListHandler,
    removeWishListHandler,
    isLoadingWishlist,
    isWishlisted,
  } = useWishlist(id ?? "");

  const similarProducts = useMemo(() => {
    if (!product || !updatedRecords.length) return [];

    return updatedRecords
      .filter(item => item.category.name === product.category.name && item._id !== product._id)
      .slice(0, 4);
  }, [updatedRecords, product]);

  const handleAddToCartWithFeedback = async () => {
    try {
      await addToCartHandler();
      setToastMessage("Product added to cart successfully");
      setToastType("success");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      setToastMessage("Failed to add product to cart");
      setToastType("danger");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleWishlistWithFeedback = async () => {
    try {
      if (isWishlisted) {
        await removeWishListHandler();
        setToastMessage("Product removed from wishlist");
      } else {
        await addWishListHandler();
        setToastMessage("Product added to wishlist");
      }
      setToastType("success");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      setToastMessage("Failed to update wishlist");
      setToastType("danger");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const quantityReachedToMax = product?.quantity === 0;

  return {
    product,
    loading,
    error,
    selectedImage,
    showModal,
    showToast,
    toastMessage,
    toastType,
    isLoadingCart,
    isLoadingWishlist,
    isWishlisted,
    similarProducts,
    quantityReachedToMax,
    setSelectedImage,
    setShowModal,
    handleAddToCartWithFeedback,
    handleWishlistWithFeedback,
  };
};

export default useProductDetails; 