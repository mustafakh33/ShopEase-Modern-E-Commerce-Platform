
const ProductDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 lg:mb-12">
          <div className="flex flex-col lg:flex-row">
            {/* Image Section Skeleton */}
            <div className="w-full lg:w-2/5 p-4 sm:p-6">
              <div className="w-full h-64 sm:h-80 lg:h-96 bg-gray-200 rounded-xl mb-4 animate-pulse"></div>
              <div className="flex gap-3 overflow-x-auto pb-2 px-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* Info Section Skeleton */}
            <div className="w-full lg:w-3/5 p-4 sm:p-6 lg:p-8">
              <div className="h-8 w-3/4 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="h-5 w-1/2 bg-gray-200 rounded mb-6 animate-pulse"></div>
              
              <div className="h-10 w-1/3 bg-gray-200 rounded mb-6 animate-pulse"></div>
              
              <div className="space-y-3 mb-6">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-3/6 bg-gray-200 rounded animate-pulse"></div>
              </div>
              
              <div className="bg-gray-100 rounded-xl p-5 mb-6">
                <div className="space-y-3">
                  <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-2/5 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar Products Skeleton */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <div className="h-8 w-1/3 bg-gray-200 rounded mx-auto mb-4 animate-pulse"></div>
            <div className="h-1 w-24 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="aspect-square bg-gray-200 animate-pulse"></div>
                <div className="p-3 space-y-2">
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsSkeleton
