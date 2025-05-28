// Subcategory Interface
interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

// Category Interface
interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
interface Brand {
  name:string | null
}

// Product Interface
interface Product {
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

// CartItem Interface
export interface CartItem {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

// ShippingAddress Interface
interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

// User Interface
interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

// Order Interface
export interface IOrderItem {
  shippingAddress?: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User;
  cartItems: CartItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export type TLoading = "idle" | "pending" | "succeeded" | "failed";