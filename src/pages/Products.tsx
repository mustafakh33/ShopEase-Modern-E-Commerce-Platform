import Product from "../components/eCommerce/Product/Product";
import { Loading } from "@components/feedback";
import { GridList } from "@components/common";
import useProducts from "@hooks/useProducts";
import usePagination from "@hooks/usePagination";
import Pagination from "../components/common/Pagination";

const Products = () => {
  const { categoryName, loading, error, updatedRecords } = useProducts();
  const { currentItems: currentProducts, currentPage, totalPages, handlePageChange } = usePagination({
    items: updatedRecords,
    itemsPerPage: 8
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Products Grid */}
        {!error && (
          <div className="mt-6">
            <Loading status={loading} error={error} type="product">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {categoryName || "All Products"} ({updatedRecords.length})
                  </h2>
                </div>

                <GridList
                  emptyMessage="No products available"
                  records={currentProducts}
                  renderItem={(record) => <Product {...record} />}
                />
              </div>

              {updatedRecords.length > 8 && (
                <div className="mt-12 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    className="bg-white shadow-sm rounded-lg"
                  />
                </div>
              )}
            </Loading>
          </div>
        )}
      </div>

      {/* Featured Products Section */}
      {!loading && !error && updatedRecords.length > 0 && (
        <div className="bg-gray-100 py-12 mt-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">
              Featured Products
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {updatedRecords.slice(0, 5).map((product) => (
                <Product
                  key={product._id}
                  {...product}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;


