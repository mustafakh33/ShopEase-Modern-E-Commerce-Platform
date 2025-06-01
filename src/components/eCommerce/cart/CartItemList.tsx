import { ICartItem } from "src/types/cartItem";
import CartItem from "./CartItem";


const CartItemList = ({
  cartItems,
}: {
  cartItems: ICartItem[];
}) => {


  const renderList = cartItems.map((cartItem) => (
    <CartItem key={cartItem.product._id} {...cartItem} />
  ));



  return (
    <div>

      <div className="divide-y divide-gray-200">
        {renderList}
      </div>
    </div>
  );
};

export default CartItemList;