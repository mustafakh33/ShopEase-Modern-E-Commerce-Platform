
const ProductSkeleton = () => {
  // Define a single skeleton card structure for a product
  const SingleProductSkeleton = () => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-full animate-pulse">
    {/* Image and Badges Skeleton */}
    <div className="relative pt-[75%] bg-gray-200">
    </div>

    {/* Product Info Skeleton */}
    <div className="p-4 flex flex-col flex-grow">
      {/* Title Skeleton */}
      <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>

      {/* Rating and Available Quantity Skeleton */}
      <div className="flex justify-between items-center mb-2">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/5"></div>
      </div>

      {/* Price Skeleton */}
      <div className="mb-3">
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </div>

      {/* Add to Cart Button Skeleton */}
      <div className="w-full h-11 bg-gray-300 rounded-xl"></div>
    </div>
  </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(8).fill(0).map((_, idx) => (
        <SingleProductSkeleton key={idx} />
      ))}
    </div>
  );
};

export default ProductSkeleton;