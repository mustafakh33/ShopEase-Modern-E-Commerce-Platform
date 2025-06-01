
const CategorySkeleton = () => {
  // Define a single skeleton card structure
  const SingleCategorySkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 border border-purple-100 animate-pulse">
      <div className="block h-full">
        <div className="relative">
          {/* Image container skeleton */}
          <div className="aspect-square overflow-hidden bg-gray-200"></div>

          {/* Gradient overlay placeholder */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-700/80 to-transparent"></div>

          {/* Content skeleton */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            {/* Category name skeleton */}
            <div className="h-7 w-3/4 bg-gray-300 rounded mb-4"></div>

            {/* View products button skeleton */}
            <div className="w-full py-3 rounded-xl bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    // Mimics the GridList structure from your Categories component
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(8).fill(0).map((_, idx) => (
        <SingleCategorySkeleton key={idx} />
      ))}
    </div>
  );
};

export default CategorySkeleton;
