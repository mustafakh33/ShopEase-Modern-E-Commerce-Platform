interface ICategoryByProduct {
  name: string;
}

export interface IProduct {
  _id?: string;
  title: string;
  price: number;
  priceAfterDiscount?:number;
  category: ICategoryByProduct;
  imageCover: string;
  ratingsAverage:number;
  count?: number;
  quantity: number;
  isAuthenticated?: boolean;
}
