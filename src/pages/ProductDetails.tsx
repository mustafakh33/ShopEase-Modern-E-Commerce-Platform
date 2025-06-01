import { useEffect, useState, useMemo } from "react";
import { FaShoppingCart, FaHeart, FaStar, FaCheck, FaRegHeart } from "react-icons/fa";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import actGetSpecificProductsById from "@store/products/thunk/actGetSpecificProductsById";
import { Spinner } from "react-bootstrap";
import Heading from "@components/common/Heading";
import { GridList } from "@components/common";
import { Product } from "@components/eCommerce";
import useProducts from "@hooks/useProducts";
import useAddToCart from "@hooks/useAddToCart";
import useWishlist from "@hooks/useWishlist";
import { Loading } from "@components/feedback";
import LottieHandler from "@components/feedback/LottieHandler";
import ProductDetailsSkeleton from "@components/feedback/skeletons/ProductDetailsSkeleton";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { specificProduct: product, loading, error } = useAppSelector((state) => state.products);
  const { loading: loadingProducts, error: errorProducts } = useProducts();
  const { updatedRecords } = useProducts();
  const [selectedImage, setSelectedImage] = useState(0);

  const { addToCartHandler, isLoadingCart } = useAddToCart(id ?? "");

  const {
    addWishListHandler,
    removeWishListHandler,
    isLoadingWishlist,
    isWishlisted,
  } = useWishlist(id ?? "");

  useEffect(() => {
    if (id) {
      dispatch(actGetSpecificProductsById(id));
    }
  }, [dispatch, id]);

  const similarProducts = useMemo(() => {
    if (!product || !updatedRecords.length) return [];

    return updatedRecords
      .filter(item => item.category.name === product.category.name && item._id !== product._id)
      .slice(0, 4);
  }, [updatedRecords, product]);

  const handleAddToCartWithFeedback = async () => {
    try {
      await addToCartHandler();
    } catch (error) {
    }
  };

  const handleWishlistWithFeedback = async () => {
    try {
      if (isWishlisted) {
        await removeWishListHandler();
      } else {
        await addWishListHandler();
      }
    } catch (error) {
    }
  };



  if (loading === "pending") {
    return <ProductDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <LottieHandler type="error" message={error as string} />
    </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 text-center max-w-md w-full">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600 text-sm sm:text-base">The requested product could not be found</p>
        </div>
      </div>
    );
  }

  const quantityReachedToMax = product.quantity <= 0;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 lg:mb-12">
          <div className="flex flex-col lg:flex-row">
            {/* Product Image Section */}
            <div className="w-full lg:w-2/5 p-4 sm:p-6">
              {/* Main Image */}
              <div className="relative bg-gray-50 rounded-xl overflow-hidden mb-4 group">
                <div className="w-full h-64 sm:h-80 lg:h-96 flex items-center justify-center p-4">
                  <img
                    src={selectedImage === 0 ? product.imageCover : product.images[selectedImage - 1]}
                    alt={product.title}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                {product.priceAfterDiscount && product.priceAfterDiscount < product.price && (
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-2 py-1 sm:px-3 sm:py-2 rounded-full shadow-lg text-xs sm:text-sm">
                    {Math.round((1 - product.priceAfterDiscount / product.price) * 100)}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 px-1">
                <button
                  className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                    selectedImage === 0 
                      ? 'ring-2 ring-indigo-500 ring-offset-1 scale-105' 
                      : 'ring-1 ring-gray-200 hover:ring-indigo-300'
                  }`}
                  onClick={() => setSelectedImage(0)}
                >
                  <img
                    src={product.imageCover}
                    alt={`${product.title} cover`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                      selectedImage === index + 1 
                        ? 'ring-2 ring-indigo-500 ring-offset-1 scale-105' 
                        : 'ring-1 ring-gray-200 hover:ring-indigo-300'
                    }`}
                    onClick={() => setSelectedImage(index + 1)}
                  >
                    <img
                      src={img}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="w-full lg:w-3/5 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white">
              {/* Title and Rating */}
              <div className="mb-4 sm:mb-6">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
                  {product.title}
                </h1>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm sm:text-base ${
                          i < Math.round(product.ratingsAverage) 
                            ? "text-amber-400" 
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm sm:text-base text-gray-600">
                    ({product.ratingsQuantity} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-4 sm:mb-6">
                {product.priceAfterDiscount && product.priceAfterDiscount < product.price ? (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-600">
                      ${product.priceAfterDiscount.toFixed(2)}
                    </span>
                    <span className="text-lg sm:text-xl text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-600">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
                  Product Description
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-gray-700">
                  {product.description}
                </p>
              </div>

              {/* Product Details */}
              <div className="bg-white rounded-xl p-4 sm:p-5 mb-4 sm:mb-6 shadow-sm border">
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <span className="font-semibold text-gray-800 min-w-[100px] text-sm sm:text-base">Category:</span>
                    <span className="text-indigo-600 text-sm sm:text-base">{product.category.name}</span>
                  </div>
                  {product.brand && (
                    <div className="flex flex-col sm:flex-row sm:gap-4">
                      <span className="font-semibold text-gray-800 min-w-[100px] text-sm sm:text-base">Brand:</span>
                      <span className="text-indigo-600 text-sm sm:text-base">{product.brand.name}</span>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <span className="font-semibold text-gray-800 min-w-[100px] text-sm sm:text-base">Availability:</span>
                    {product.quantity > 0 ? (
                      <span className="text-emerald-600 flex items-center gap-2 text-sm sm:text-base">
                        <FaCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                        In Stock ({product.quantity} available)
                      </span>
                    ) : (
                      <span className="text-red-600 text-sm sm:text-base">Out of Stock</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className={`rounded-lg font-semibold py-2.5 px-4 text-sm transition-all duration-300 flex items-center justify-center gap-2 min-w-[140px] ${
                    quantityReachedToMax
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg"
                  }`}
                  onClick={handleAddToCartWithFeedback}
                  disabled={isLoadingCart || quantityReachedToMax}
                >
                  {isLoadingCart ? (
                    <>
                      <Spinner animation="border" size="sm" className="text-white" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <FaShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleWishlistWithFeedback}
                  disabled={isLoadingWishlist}
                  className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:border-red-400 hover:bg-red-50 transition-all duration-300 group"
                >
                  {isLoadingWishlist ? (
                    <Spinner animation="border" size="sm" className="text-red-500" />
                  ) : isWishlisted ? (
                    <FaHeart className="w-4 h-4 text-red-500" />
                  ) : (
                    <FaRegHeart className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="mb-8">
          {!error && similarProducts.length > 0 && (
            <>
              <div className="text-center mb-6 sm:mb-8 lg:mb-12">
                <Heading
                  title="Products you may like"
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4"
                />
                <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
              </div>
              <section className="py-2 sm:py-4 px-2 sm:px-4 lg:px-6">
                <Loading status={loadingProducts} error={errorProducts} type="product">
                  <GridList
                    emptyMessage="No similar products available"
                    records={similarProducts}
                    renderItem={(record) => <Product {...record} />}
                  />
                </Loading>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;