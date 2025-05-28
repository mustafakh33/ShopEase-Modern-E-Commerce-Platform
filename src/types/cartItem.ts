interface Product {
  _id: string;
  title: string;
  quantity: number;
  imageCover?: string;
  ratingsAverage:string;
  category: { name: string };
  brand: { name: string };
}

export interface ICartItem {
  count: number;
  price: number;
  product: Product;
}

export interface ICartResponse {
  numOfCartItems: number;
  cartId: string;
  data: {
    cartOwner: string;
    products: ICartItem[];
    totalCartPrice: number;
  };
}
