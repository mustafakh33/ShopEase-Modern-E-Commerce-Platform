import CartItemSkeleton from './CartItemSkeleton'; // Make sure this path is correct
import CartSubtotalPriceSkeleton from './CartSubtotalPriceSkeleton'; // Make sure this path is correct

const CartSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50  pb-16">
      <div >
        {/* Cart Content Container */}
        <div className=" bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">

          {/* List of Cart Items */}
          <div className="divide-y divide-gray-200">
            {/* Render multiple CartItemSkeletons to show a list */}
            {Array(3).fill(0).map((_, idx) => ( // Adjust number of items as typical for a cart
              <CartItemSkeleton key={idx} />
            ))}
          </div>

          {/* Pagination Placeholder (if itemsPerPage > 5) */}
          <div className="px-6 py-4 bg-gray-50 flex justify-center">
            <div className="h-10 w-48 bg-gray-200 rounded-lg" /> {/* Pagination */}
          </div>
          
          {/* Cart Subtotal Price Section */}
          <CartSubtotalPriceSkeleton />
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;