// src/components/home/BrandsSection.tsx
import { GridList } from '@components/common';
import { Brand } from '@components/eCommerce';
import { Loading } from '@components/feedback';
import { Link } from 'react-router-dom';
import { TLoading } from 'src/types/shared';

interface BrandsSectionProps {
  brands: any[];
  loading: TLoading;
  error: any;
}

const BrandsSection = ({ brands, loading, error }: BrandsSectionProps) => {
  // Display only 4 brands
  const featuredBrands = brands.slice(0, 4);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Brands</h2>
          <div className="w-24 h-1 bg-purple-800 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our trusted brands with quality products
          </p>
        </div>

        <div className="flex justify-end mb-8">
          <Link
            to="/brands"
            className="flex items-center text-purple-800 hover:text-purple-700 font-medium transition-colors"
          >
            View All Brands
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        <Loading status={loading} error={error}>
          <GridList
            emptyMessage="No brands available"
            records={featuredBrands}
            renderItem={(record) => <Brand {...record} />}
          />
        </Loading>
      </div>
    </section>
  );
};

export default BrandsSection;