import { Badge } from "react-bootstrap";
import Heading from "@components/common/Heading";
import useOrders from "@hooks/useOrders";
import ProductDetailsModal from "@components/eCommerce/orders/ProductDetailsModal";
import Pagination from "@components/common/Pagination";


const Orders = () => {
  const {
    orders,
    loading,
    error,
    showModal,
    setShowModal,
    selectedCartItems,
    isIndividualProduct,
    currentPage,
    currentOrders,
    totalPages,
    indexOfFirstOrder,
    indexOfLastOrder,
    handleShowOrderDetails,
    handleShowProductDetails,
    formatDate,
    getStatusBadge,
    paginate,
  } = useOrders();

  if (loading === "pending") {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-800"></div>
      </div>
    );
  }

  if (loading === "failed" && error) {
    return (
      <div
        className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg"
        role="alert"
      >
        <div className="flex items-center">
          <i className="bi bi-exclamation-triangle-fill mr-2"></i>
          <p className="text-sm sm:text-base">{error}</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0 && loading === "succeeded") {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="bi bi-bag-x text-indigo-600 text-3xl"></i>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Orders Yet
        </h3>
        <p className="text-gray-600 mb-6">
          You haven't placed any orders yet. Start shopping to see your orders
          here!
        </p>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Heading
            title="My Orders"
            className="text-purple-900 text-xl sm:text-2xl mb-2"
          />
          <p className="text-gray-600 text-sm sm:text-base">
            Track and manage your order history
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="text-sm text-gray-500">
            Total:{" "}
            <span className="font-semibold text-gray-900">{orders.length}</span>{" "}
            orders
          </span>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block sm:hidden space-y-4">
        {currentOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  #{order.id}
                </h3>
                <p className="text-xs text-gray-500">
                  {formatDate(order.createdAt)}
                </p>
              </div>
              <div>
                <Badge
                  bg={
                    getStatusBadge(order.isPaid, order.isDelivered) ===
                      "Delivered"
                      ? "success"
                      : getStatusBadge(order.isPaid, order.isDelivered) ===
                        "In Delivery"
                        ? "warning"
                        : "danger"
                  }
                  text={
                    getStatusBadge(order.isPaid, order.isDelivered) ===
                      "In Delivery"
                      ? "dark"
                      : undefined
                  }
                  className="text-xs"
                >
                  {getStatusBadge(order.isPaid, order.isDelivered)}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 mb-3">
              <div>
                <span className="font-medium">Items:</span>{" "}
                {order.cartItems.length}
              </div>
              <div>
                <span className="font-medium">Total:</span>{" "}
                {order.totalOrderPrice.toFixed(2)} EGP
              </div>
              <div className="col-span-2">
                <span className="font-medium">Payment:</span>{" "}
                {order.paymentMethodType}
              </div>
            </div>

            {/* Products List for Mobile */}
            <div className="mb-3">
              <h4 className="text-xs font-semibold text-gray-700 mb-2">
                Products:
              </h4>
              <div className="space-y-2">
                {order.cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded"
                  >
                    <div className="flex items-center space-x-2">
                      <img
                        src={item.product?.imageCover}
                        alt={item.product?.title}
                        className="w-8 h-8 object-cover rounded"
                      />
                      <div>
                        <p className="text-xs font-medium text-gray-900 truncate max-w-32">
                          {item.product.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.count} × {item.price} EGP
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleShowProductDetails(item)}
                      className="text-xs text-indigo-600 hover:text-indigo-800 underline"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleShowOrderDetails(order)}
                className="flex-1 py-2 text-center text-indigo-700 hover:text-indigo-900 font-medium text-sm border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                View All Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <div className="inline-block min-w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <table className="min-w-full bg-white">
            <thead className="bg-indigo-900 text-white">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Order
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Date
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Products
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Total
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Payment
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="py-3 px-4 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-indigo-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">
                      #{order.id}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 text-sm">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      {order.cartItems.slice(0, 2).map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center space-x-2"
                        >
                          <img
                            src={item.product?.imageCover}
                            alt={item.product?.title}
                            className="w-6 h-6 object-cover rounded"
                          />
                          <button
                            onClick={() => handleShowProductDetails(item)}
                            className="text-xs text-gray-700 hover:text-indigo-600 underline hover:no-underline truncate max-w-32"
                          >
                            {item.product.title}
                          </button>
                        </div>
                      ))}
                      {order.cartItems.length > 2 && (
                        <p className="text-xs text-gray-500">
                          +{order.cartItems.length - 2} more items
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-purple-900">
                    {order.totalOrderPrice.toFixed(2)} EGP
                  </td>
                  <td className="py-3 px-4 text-gray-600 text-sm">
                    {order.paymentMethodType}
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      bg={
                        getStatusBadge(order.isPaid, order.isDelivered) ===
                          "Delivered"
                          ? "success"
                          : getStatusBadge(order.isPaid, order.isDelivered) ===
                            "In Delivery"
                            ? "warning"
                            : "danger"
                      }
                      text={
                        getStatusBadge(order.isPaid, order.isDelivered) ===
                          "In Delivery"
                          ? "dark"
                          : undefined
                      }
                      className="text-xs"
                    >
                      {getStatusBadge(order.isPaid, order.isDelivered)}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleShowOrderDetails(order)}
                      className="text-indigo-700 hover:text-indigo-900 font-medium text-sm underline hover:no-underline transition-all"
                    >
                      View All Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstOrder + 1}-
            {Math.min(indexOfLastOrder, orders.length)} of {orders.length}{" "}
            orders
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={paginate}
          />
        </div>
      )}

      <ProductDetailsModal
        show={showModal}
        onHide={() => setShowModal(false)}
        cartItems={selectedCartItems}
        isIndividualProduct={isIndividualProduct}
      />
    </div>
  );
};

export default Orders;