// import Brand from "../components/eCommerce/Brand";
// import { GridList } from "@components/common";
// import { Loading } from "@components/feedback";
// import useBrands from "@hooks/useBrands";
// import usePagination from "@hooks/usePagination";
// import { useState } from "react";
// import Pagination from "../components/common/Pagination";

// const Brands = () => {
//   const { allBrands, loading, error } = useBrands();
//   const [itemsPerPage] = useState(8); // Show 8 brands per page
  
//   const { currentItems: currentBrands, currentPage, totalPages, handlePageChange } = usePagination({
//     items: allBrands,
//     itemsPerPage,
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 pt-24 pb-16">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Brands Grid */}
//         {!error && (
//           <div className="mt-6">
//             <Loading status={loading} error={error} type="brand">
//               <div className="mb-8">
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-2xl font-semibold text-gray-800">
//                     All Brands ({allBrands.length})
//                   </h2>
//                   {/* يمكن إضافة فلتر أو بحث هنا إذا لزم الأمر */}
//                 </div>

//                 <GridList
//                   emptyMessage="No brands available"
//                   records={currentBrands}
//                   renderItem={(record) => <Brand {...record} />}
//                 />
//               </div>
              
//               {allBrands.length > itemsPerPage && (
//                 <div className="mt-12 flex justify-center">
//                   <Pagination
//                     currentPage={currentPage}
//                     totalPages={totalPages}
//                     onPageChange={handlePageChange}
//                     className="bg-white shadow-sm rounded-lg"
//                   />
//                 </div>
//               )}
//             </Loading>
//           </div>
//         )}
//       </div>

//       {/* Featured Brands Section */}
//       {!loading && !error && allBrands.length > 0 && (
//         <div className="bg-gray-100 py-12 mt-12">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">
//               Featured Brands
//             </h3>
//             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//               {allBrands.slice(0, 6).map((brand) => (
//                 <div 
//                   key={brand._id} 
//                   className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center"
//                 >
//                   <img 
//                     src={brand.image} 
//                     alt={brand.name} 
//                     className="h-12 object-contain"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Brands;


import Brand from "../components/eCommerce/Brand";
import { GridList } from "@components/common";
import { Loading } from "@components/feedback";
import useBrands from "@hooks/useBrands";
import usePagination from "@hooks/usePagination";
import { useState } from "react";
import Pagination from "../components/common/Pagination";

const Brands = () => {
  const { allBrands, loading, error } = useBrands();
  const [itemsPerPage] = useState(8); // Show 8 brands per page

  const { currentItems: currentBrands, currentPage, totalPages, handlePageChange } = usePagination({
    items: allBrands,
    itemsPerPage,
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brands Title */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              All Brands ({allBrands?.length || 0})
            </h2>
            {/* يمكن إضافة فلتر أو بحث هنا إذا لزم الأمر */}
          </div>
        </div>

        {/* Brands Grid */}
        {!error && (
          <div className="mt-6">
            <Loading status={loading} error={error} type="brand">
              <GridList
                emptyMessage="No brands available"
                records={currentBrands}
                renderItem={(record) => <Brand {...record} />}
              />
              {allBrands?.length > itemsPerPage && (
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

      {/* Featured Brands Section */}
      {!loading && !error && allBrands?.length > 0 && (
        <div className="bg-gray-100 py-12 mt-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">
              Featured Brands
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {allBrands.slice(0, 6).map((brand) => (
                <div
                  key={brand._id}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center"
                >
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="h-12 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Brands;