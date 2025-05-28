import { useState } from 'react';
import useCategories from './useCategories';
import { TLoading } from 'src/types/shared';

interface UseCategoryPaginationProps {
  itemsPerPage?: number;
}

interface UseCategoryPaginationReturn {
  currentCategories: any[];
  currentPage: number;
  totalPages: number;
  loading: TLoading;
  error: any;
  handlePageChange: (pageNumber: number) => void;
  totalCategories: number;
}

const useCategoryPagination = ({ itemsPerPage = 8 }: UseCategoryPaginationProps = {}): UseCategoryPaginationReturn => {
  const { records, loading, error } = useCategories();
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = records.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(records.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    currentCategories,
    currentPage,
    totalPages,
    loading,
    error,
    handlePageChange,
    totalCategories: records.length
  };
};

export default useCategoryPagination; 