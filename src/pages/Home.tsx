import useCategories from '@hooks/useCategories';
import useProducts from '@hooks/useProducts';
import useBrands from '@hooks/useBrands';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HeroSlider from '@components/eCommerce/home/HeroSlider';
import CategoriesSection from '@components/eCommerce/home/CategoriesSection';
import FeaturedProductsSection from '@components/eCommerce/home/FeaturedProductsSection';
import CallToActionSection from '@components/eCommerce/home/CallToActionSection';
import FeaturesSection from '@components/eCommerce/home/FeaturesSection';
import NewsletterSection from '@components/eCommerce/home/NewsletterSection';
import BrandsSection from '@components/eCommerce/home/BrandsSection';

const Home = () => {
  const {
    records: categories,
    loading: categoriesLoading,
    error: categoriesError
  } = useCategories();
  
  const { 
    loading: productsLoading, 
    error: productsError, 
    updatedRecords 
  } = useProducts();
  
  const {
    allBrands: brands,
    loading: brandsLoading,
    error: brandsError
  } = useBrands();

  return (
    <div className="min-h-screen bg-white pt-16">
      <HeroSlider />
      <CategoriesSection
        categories={categories}
        loading={categoriesLoading}
        error={categoriesError}
      />
      <FeaturedProductsSection
        products={updatedRecords}
        loading={productsLoading === "pending"}
        error={productsError}
      />
      <BrandsSection
        brands={brands}
        loading={brandsLoading}
        error={brandsError}
      />
      <CallToActionSection />
      <FeaturesSection />
      <NewsletterSection />
    </div>
  );
};

export default Home;