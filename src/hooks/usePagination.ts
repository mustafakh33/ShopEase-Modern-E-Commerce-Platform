import { useState, useMemo } from 'react';

interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage: number;
}

interface UsePaginationReturn<T> {
  currentItems: T[];
  currentPage: number;
  totalPages: number;
  handlePageChange: (pageNumber: number) => void;
}

const usePagination = <T>({ items, itemsPerPage }: UsePaginationProps<T>): UsePaginationReturn<T> => {
  const [currentPage, setCurrentPage] = useState(1);

  const { currentItems, totalPages } = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

    // Adjust current page if it's now greater than total pages
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }

    return { currentItems, totalPages };
  }, [items, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    currentItems,
    currentPage,
    totalPages,
    handlePageChange,
  };
};

export default usePagination;