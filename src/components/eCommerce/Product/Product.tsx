import { memo } from "react";
import { Spinner } from "react-bootstrap";
import { FaHeart, FaRegHeart, FaStar, FaShoppingCart, FaEye } from "react-icons/fa";
import useAddToCart from "@hooks/useAddToCart";
import useWishlist from "@hooks/useWishlist";
import useProduct from "@hooks/useProduct";
import { useNavigate } from "react-router-dom";

interface ICategoryByProduct {
  name: string;
}

interface ProductProps {
  _id?: string;
  title: string;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  count: number;
  quantity: number;
  isAuthenticated: boolean;
  ratingsAverage?: number;
  category?: ICategoryByProduct;
}

const Product = memo(
  ({
    _id,
    title,
    price,
    priceAfterDiscount,
    imageCover,
    count,
    quantity,
    ratingsAverage = 0,
  }: ProductProps) => {
    const navigate = useNavigate();

    const { quantityReachedToMax, truncatedTitle, currentRemainingQuantity } =
      useProduct({ title, count, quantity });

    const { addToCartHandler, isLoadingCart } = useAddToCart(_id ?? "");

    const {
      addWishListHandler,
      removeWishListHandler,
      isLoadingWishlist,
      isWishlisted,
    } = useWishlist(_id ?? "");

    // Calculate discount percentage
    const discountPercentage = priceAfterDiscount
      ? Math.round(((price - priceAfterDiscount) / price) * 100)
      : 0;

    const goToProductDetails = () => {
      if (_id) {
        navigate(`/product-details/${_id}`);
      }
    };

    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col h-full group relative">
        {/* Image and Badges */}
        <div className="relative pt-[75%] cursor-pointer overflow-hidden" onClick={goToProductDetails}>
          <img
            src={imageCover}
            alt={title}
            className="absolute inset-0 w-full h-full object-contain p-3 transition-all duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              isWishlisted ? removeWishListHandler() : addWishListHandler();
            }}
            className={`absolute top-4 right-4 z-20 w-11 h-11 flex items-center justify-center rounded-2xl backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-opacity-30 ${
              isWishlisted 
                ? 'bg-red-50/90 text-red-500 border-2 border-red-200 focus:ring-red-300' 
                : 'bg-white/90 text-gray-600 border-2 border-gray-200 hover:text-red-500 hover:border-red-200 focus:ring-red-300'
            }`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isLoadingWishlist ? (
              <Spinner animation="border" size="sm" className="text-red-500" />
            ) : isWishlisted ? (
              <FaHeart className="text-red-500 text-xl animate-pulse" />
            ) : (
              <FaRegHeart className="text-xl transition-transform duration-200 hover:scale-110" />
            )}
          </button>

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm px-3 py-1.5 rounded-xl font-bold shadow-lg animate-bounce">
              -{discountPercentage}%
            </div>
          )}

          {/* Out of Stock Badge */}
          {quantityReachedToMax && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white text-sm px-3 py-1.5 rounded-xl font-bold shadow-lg">
              Out of Stock
            </div>
          )}
        </div>

        {/* Quick View Button - Centered Below Image */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToProductDetails();
            }}
            className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full font-semibold shadow-xl hover:shadow-2xl flex items-center gap-2 z-10"
            aria-label="Quick View"
          >
            <FaEye className="w-4 h-4" />
            <span>View</span>
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col flex-grow">
          <h5 className="text-gray-900 font-semibold text-base line-clamp-2 mb-2 min-h-[40px] leading-tight hover:text-purple-700 transition-colors duration-200">
            {truncatedTitle}
          </h5>

          {/* Rating and Available Quantity */}
          <div className="flex justify-between items-center mb-2">
            {ratingsAverage > 0 ? (
              <div className="flex items-center">
                <FaStar className="text-amber-500 text-sm mr-1" />
                <span className="text-amber-700 font-medium text-sm">{ratingsAverage.toFixed(1)}</span>
              </div>
            ) : (
              <span className="text-xs text-gray-500 italic">No ratings</span>
            )}
            {!quantityReachedToMax && (
              <span className="text-sm text-green-700 font-medium">
                {currentRemainingQuantity} left
              </span>
            )}
          </div>

          {/* Price */}
          <div className="mb-3">
            {priceAfterDiscount ? (
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-purple-900 text-lg">
                  {priceAfterDiscount.toFixed(2)} EGP
                </span>
                <span className="text-gray-500 text-sm line-through">
                  {price.toFixed(2)} EGP
                </span>
              </div>
            ) : (
              <span className="font-bold text-purple-900 text-lg">
                {price.toFixed(2)} EGP
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            className={`w-full relative overflow-hidden rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 py-2.5 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
              quantityReachedToMax
                ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white focus:ring-purple-300 group/button"
            }`}
            onClick={addToCartHandler}
            disabled={isLoadingCart || quantityReachedToMax}
            aria-label="Add to cart"
          >
            {!quantityReachedToMax && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/button:translate-x-full transition-transform duration-700"></div>
            )}
            {isLoadingCart ? (
              <>
                <Spinner animation="border" size="sm" className="text-white w-4 h-4" />
                <span>Loading...</span>
              </>
            ) : quantityReachedToMax ? (
              <span>Out of Stock</span>
            ) : (
              <>
                <FaShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>

        {/* Subtle Border Animation */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-indigo-400/20 p-[1px]">
            <div className="w-full h-full bg-white rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }
);

export default Product;