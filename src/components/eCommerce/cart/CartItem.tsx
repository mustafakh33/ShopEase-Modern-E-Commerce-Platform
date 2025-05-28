import { ICartItem } from "src/types/cartItem";
import { MdDelete } from "react-icons/md";
import { Spinner } from "react-bootstrap";
import useCart from "@hooks/useCart";
import { FaStar } from "react-icons/fa";

const CartItem = ({ product, price, count }: ICartItem) => {
  const {
    isLoading,
    errorMessage,
    totalPrice,
    handleRemoveCartItem,
    onChangeCount,
    handleUpdateCartQuantity,
    itemCount,
  } = useCart({ product, price, count });

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="w-full md:w-1/4 flex justify-center">
          <div className="relative bg-gray-50 rounded-xl overflow-hidden h-44 w-full flex items-center justify-center border border-gray-100">
            <img
              src={product.imageCover}
              alt={product.title}
              className="object-contain h-full w-full p-4"
            />
          </div>
        </div>
        
        {/* Product Details */}
        <div className="w-full md:w-3/4">
          {/* Top Row: Category and Delete */}
          <div className="flex justify-between items-start mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full">
              {product.category.name}
            </span>
            <button 
              onClick={handleRemoveCartItem}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
              aria-label="Remove item"
            >
              <MdDelete size={20} />
            </button>
          </div>
          
          {/* Product Title and Rating */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2 hover:text-purple-700 transition-colors">
              {product.title}
            </h3>
            <div className="flex items-center text-amber-500 text-sm">
              <FaStar className="w-4 h-4 mr-1" />
              {product.ratingsAverage || '4.5'}
            </div>
          </div>
          
          {/* Brand */}
          <div className="mb-6">
            <span className="text-gray-500 text-sm">Brand: </span>
            <span className="font-medium text-gray-700">{product?.brand?.name || 'N/A'}</span>
          </div>
          
          {/* Bottom Row: Quantity Control and Price */}
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm mb-1">Quantity:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={itemCount || 1}
                    onChange={onChangeCount}
                    min={1}
                    max={product?.quantity}
                    className="py-2 px-3 w-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                  <button
                    onClick={handleUpdateCartQuantity}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-sm font-medium rounded-lg px-4 py-2 transition-all shadow-md hover:shadow-lg"
                  >
                    {isLoading ? <Spinner animation="border" size="sm" /> : "Update"}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-xl font-bold text-purple-900">
                {totalPrice.toFixed(2)} EGP
              </div>
            </div>
          </div>
          
          {/* Error Message */}
          {errorMessage && (
            <div className="mt-4 p-2 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;