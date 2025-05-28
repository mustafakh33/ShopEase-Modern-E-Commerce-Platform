import { Loading } from "@components/feedback";
import { GridList } from "@components/common";
import { Product } from "@components/eCommerce";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetUserWishlist from "@store/wishlist/thunk/actGetUserWishlist";
import { useEffect } from "react";
import Pagination from "../components/common/Pagination";
import usePagination from "@hooks/usePagination";

const Wishlist = () => {
  const { allWishList, loading, error } = useAppSelector(
    (state) => state.Wishlist
  );
  
  const dispatch = useAppDispatch();
  useEffect(() => {
    const promise = dispatch(actGetUserWishlist());
    return () => {
      promise.abort();
    };
  }, []);

  const { currentItems: currentWishlistItems, currentPage, totalPages, handlePageChange } = usePagination({
    items: allWishList?.data || [],
    itemsPerPage: 8
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Wishlist Grid */}
        <div className="mt-6">
          <Loading status={loading} error={error} type="product">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Your Wishlist ({allWishList?.data?.length || 0})
                </h2>
              </div>

              <GridList
                emptyMessage="Your wishlist is empty"
                records={currentWishlistItems}
                renderItem={(record) => (
                  <Product 
                    {...record} 
                    count={record.count ?? 0} 
                    isAuthenticated={record.isAuthenticated ?? false} 
                  />
                )}
              />
            </div>
            
            {(allWishList?.data?.length || 0) > 8 && (
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

        {/* Recommended Section */}
        {!loading && !error && allWishList?.data?.length === 0 && (
          <div className="bg-gray-100 py-12 mt-12 rounded-xl">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                Discover Products You Might Like
              </h3>
              {/* Here you could add a component that shows recommended products */}
              <p className="text-gray-500">
                Browse our collections to find products to add to your wishlist
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;