import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/store";
import actGetPayment from "@store/payment/thunk/actGetPayment";

interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

const usePaymentForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, url, error } = useSelector((state: RootState) => state.payment);

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    details: "",
    phone: "",
    city: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = localStorage.getItem("cartId");
    if (id) {
      await dispatch(actGetPayment(id));
    }
  };

  return {
    shippingAddress,
    handleInputChange,
    handleSubmit,
    loading,
    url,
    error,
  };
};

export default usePaymentForm; 