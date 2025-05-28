import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetOrders from "@store/orders/thunk/actGetOrders";
import { resetOrderStatus } from "@store/orders/ordersSlice";
import { IOrderItem, CartItem } from "src/types/order";

const useOrders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders.orderList);
  const loading = useAppSelector((state) => state.orders.loading);
  const error = useAppSelector((state) => state.orders.error);

  const [showModal, setShowModal] = useState(false);
  const [selectedCartItems, setSelectedCartItems] = useState<CartItem[]>([]);
  const [isIndividualProduct, setIsIndividualProduct] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);

  const cartId = localStorage.getItem("cartOwner");

  useEffect(() => {
    if (cartId) {
      dispatch(actGetOrders(cartId));
    }
    return () => {
      dispatch(resetOrderStatus());
    };
  }, [cartId, dispatch]);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleShowOrderDetails = (order: IOrderItem) => {
    setSelectedCartItems([...order.cartItems]);
    setIsIndividualProduct(false);
    setShowModal(true);
  };

  const handleShowProductDetails = (product: CartItem) => {
    setSelectedCartItems([product]);
    setIsIndividualProduct(true);
    setShowModal(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (isPaid: boolean, isDelivered: boolean) => {
    if (isDelivered) {
      return "Delivered";
    } else if (isPaid) {
      return "In Delivery";
    } else {
      return "Pending";
    }
  };

  return {
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
    setCurrentPage,
  };
};

export default useOrders;