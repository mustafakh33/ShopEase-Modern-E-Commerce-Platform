
const CartItemSkeleton = () => {
  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-gray-200 animate-pulse">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image Placeholder */}
        <div className="w-full md:w-1/4 flex justify-center">
          <div className="relative bg-gray-200 rounded-xl overflow-hidden h-44 w-full flex items-center justify-center border border-gray-100">
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent shimmer-animation" />
          </div>
        </div>

        {/* Product Details Placeholders */}
        <div className="w-full md:w-3/4">
          {/* Top Row: Category and Delete Button Placeholder */}
          <div className="flex justify-between items-start mb-4">
            <div className="h-6 w-24 bg-gray-200 rounded-full" /> {/* Category badge */}
            <div className="h-6 w-6 bg-gray-200 rounded" /> {/* Delete icon */}
          </div>

          {/* Product Title and Rating Placeholder */}
          <div className="mb-4">
            <div className="h-6 bg-gray-300 rounded w-11/12 mb-2" /> {/* Title line 1 */}
            <div className="h-6 bg-gray-300 rounded w-3/4" /> {/* Title line 2 */}
            <div className="flex items-center mt-2">
              <div className="h-4 w-4 bg-gray-200 rounded-full mr-1" /> {/* Star icon */}
              <div className="h-4 w-8 bg-gray-200 rounded" /> {/* Rating text */}
            </div>
          </div>

          {/* Brand Placeholder */}
          <div className="mb-6">
            <div className="h-4 w-1/3 bg-gray-200 rounded" /> {/* Brand text */}
          </div>

          {/* Bottom Row: Quantity Control and Price Placeholder */}
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
              <div className="flex flex-col">
                <div className="h-4 w-16 bg-gray-200 rounded mb-1" /> {/* Quantity label */}
                <div className="flex items-center gap-2">
                  <div className="h-10 w-20 bg-gray-200 rounded-lg" /> {/* Quantity input */}
                  <div className="h-10 w-20 bg-gray-300 rounded-lg" /> {/* Update button */}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="h-7 w-28 bg-gray-300 rounded" /> {/* Total price */}
            </div>
          </div>
          

        </div>
      </div>
    </div>
  );
};

export default CartItemSkeleton;