interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ProductResponse {
    images: string[];
    ratingsQuantity: number;
    _id: string;
    title: string;
    description: string;
    quantity: number;
    price: number;
    priceAfterDiscount: number;
    imageCover: string;
    category: Category;
    brand: null | {
      _id: string;
      name: string;
      slug: string;
      image?: string;
    };
    ratingsAverage: number;
    reviews: any[];
}
