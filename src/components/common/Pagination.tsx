import { FC } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  className?: string;
}

const Pagination: FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className = ""
}) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className={`flex justify-center items-center mt-6 ${className}`}>
      <div className="flex space-x-1">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
          }`}
          aria-label="Previous page"
        >
          &laquo;
        </button>
        
        {/* Page numbers */}
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          
          // Show first page, last page, and pages around current page
          if (
            pageNumber === 1 ||
            pageNumber === totalPages ||
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
          ) {
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === pageNumber
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                }`}
                aria-label={`Page ${pageNumber}`}
                aria-current={currentPage === pageNumber ? "page" : undefined}
              >
                {pageNumber}
              </button>
            );
          }
          
          // Show ellipsis for gaps
          if (
            (pageNumber === 2 && currentPage > 3) ||
            (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
          ) {
            return <span key={pageNumber} className="px-2 py-1" aria-hidden="true">...</span>;
          }
          
          return null;
        })}
        
        {/* Next button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
          }`}
          aria-label="Next page"
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default Pagination;