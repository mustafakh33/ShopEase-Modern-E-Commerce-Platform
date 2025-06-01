import { Loading } from "@components/feedback";
import { GridList } from "@components/common";
import { Category } from "@components/eCommerce";
import useCategoryPagination from "@hooks/useCategoryPagination";
import Pagination from "../components/common/Pagination";

const Categories = () => {
  const {
    currentCategories,
    currentPage,
    totalPages,
    loading,
    error,
    handlePageChange,
    totalCategories
  } = useCategoryPagination();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Categories Title */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              All Categories ({totalCategories || 0})
            </h2>
          </div>
        </div>

        {/* Categories Grid */}
        {!error && (
          <div className="mt-6">
            <Loading status={loading} error={error} type="category">
              <GridList
                emptyMessage="No categories available"
                records={currentCategories}
                renderItem={(record) => <Category {...record} />}
              />

              {totalCategories > 8 && (
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

      {/* Popular Categories Section */}
      {!loading && !error && totalCategories > 0 && (
        <div className="bg-gray-100 py-12 mt-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">
              Popular Categories
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {currentCategories.slice(0, 6).map((category) => (
                <div
                  key={category._id}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center"
                >
                  <Category {...category} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;