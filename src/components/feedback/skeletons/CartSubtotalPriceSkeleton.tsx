
const CartSubtotalPriceSkeleton = () => {
  return (
    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 animate-pulse">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        {/* Subtotal text and value */}
        <div className="mb-4 sm:mb-0 flex items-baseline">
          <div className="h-6 w-20 bg-gray-200 rounded mr-2" /> {/* Subtotal label */}
          <div className="h-8 w-32 bg-gray-300 rounded" /> {/* Price value */}
        </div>

        {/* Buttons placeholder */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="h-12 w-full sm:w-40 bg-gray-300 rounded-lg shadow-md" /> {/* Place Order button */}
          <div className="h-12 w-full sm:w-40 bg-gray-300 rounded-lg shadow-md" /> {/* Buy Now button */}
        </div>
      </div>
    </div>
  );
};

export default CartSubtotalPriceSkeleton;