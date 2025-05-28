import { GridList } from '@components/common';
import Product from '@components/eCommerce/Product/Product';
import { Loading } from '@components/feedback';
import { Link } from 'react-router-dom';
import { TLoading } from 'src/types/shared';

interface FeaturedProductsSectionProps {
  products: any[];
  loading: boolean;
  error: any;
}

const FeaturedProductsSection = ({ products, loading, error }: FeaturedProductsSectionProps) => {
  // Display only 4 products
  const featuredProducts = products.slice(0, 4);

  // Convert boolean loading to TLoading type
  const loadingStatus: TLoading = loading ? "pending" : "succeeded";

  return (
    <section className="py-16 bg-indigo-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-indigo-900 mb-2">Featured Products</h2>
          <div className="w-24 h-1 bg-purple-800 mx-auto mb-4"></div>
          <p className="text-lg text-indigo-600 max-w-2xl mx-auto">
            Discover our carefully selected premium products
          </p>
        </div>

        <div className="flex justify-end mb-8">
          <Link
            to="/products/allProduct"
            className="flex items-center text-purple-800 hover:text-purple-700 font-medium transition-colors"
          >
            View All Products
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        <Loading status={loadingStatus} error={error} type="product">
          <GridList
            emptyMessage="No products available"
            records={featuredProducts}
            renderItem={(record) => <Product {...record} />}
          />
        </Loading>
      </div>
    </section>
  );
};

export default FeaturedProductsSection; 