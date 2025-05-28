import { Modal, Button } from "react-bootstrap";
import { CartItem } from "src/types/order";

interface ProductDetailsModalProps {
  show: boolean;
  onHide: () => void;
  cartItems: CartItem[];
  isIndividualProduct?: boolean;
}

const ProductDetailsModal = ({
  show,
  onHide,
  cartItems,
  isIndividualProduct = false,
}: ProductDetailsModalProps) => {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="bg-indigo-900 text-white">
        <Modal.Title>
          {isIndividualProduct ? "Product Details" : "Order Details"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4 max-h-96 overflow-y-auto">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="mb-4 pb-3 border-b border-indigo-100 last:border-b-0"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-shrink-0">
                <img
                  src={item.product?.imageCover}
                  alt={item.product?.title}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-indigo-100 mx-auto sm:mx-0"
                />
              </div>
              <div className="flex-grow">
                <h5 className="text-indigo-900 font-bold text-sm sm:text-base mb-2">
                  {item.product.title}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2 text-xs sm:text-sm">
                  <span className="text-indigo-700">
                    <strong>Category:</strong> {item.product?.category?.name}
                  </span>
                  <span className="text-indigo-700">
                    <strong>Brand:</strong> {item.product?.brand?.name ?? "N/A"}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
                  <div className="text-indigo-700">
                    <strong>Price:</strong> {item.price} EGP
                  </div>
                  <div className="text-indigo-700">
                    <strong>Qty:</strong> {item.count}
                  </div>
                  <div className="text-purple-900 font-medium">
                    <strong>Total:</strong>{" "}
                    {(item.price * item.count).toFixed(2)} EGP
                  </div>
                </div>
                {item.product.ratingsAverage > 0 && (
                  <div className="mt-2 text-xs sm:text-sm">
                    <span className="text-amber-600 font-medium">
                      Rating: {item.product.ratingsAverage.toFixed(1)}/5
                    </span>
                    <span className="text-indigo-700 ml-2">
                      ({item.product.ratingsQuantity} reviews)
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-indigo"
          onClick={onHide}
          className="border-indigo-700 text-indigo-700 hover:bg-indigo-50"
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetailsModal;