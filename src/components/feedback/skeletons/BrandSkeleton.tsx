
const BrandSkeleton = () => {
  const SingleBrandSkeleton = () => (
    <div
      className="my-1 relative overflow-hidden w-full h-48 rounded-xl cursor-pointer group animate-pulse"
      style={{ backgroundColor: "#e2e8f0" }} // A light gray background for the skeleton
    >
      {/* Brand image placeholder */}
      <div className="w-full h-full object-cover bg-gray-300"></div>

      {/* Brand name overlay placeholder */}
      <div
        className="absolute bottom-0 left-0 w-full p-5 z-20"
        style={{
          background: "linear-gradient(to top, rgba(156, 163, 175, 0.5) 0%, transparent 100%)", // Gray gradient
        }}
      >
        <div className="h-6 w-3/4 bg-gray-400 rounded-md mx-auto"></div> {/* Placeholder for name */}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(8).fill(0).map((_, idx) => (
        <SingleBrandSkeleton key={idx} />
      ))}
    </div>
  );
};

export default BrandSkeleton;