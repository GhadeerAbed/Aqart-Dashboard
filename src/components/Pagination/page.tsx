 
import React from 'react';
import {PaginationProps} from '../types/page'

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange ,totalEntries }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-2 py-1 mx-1 text-darkSecondary ${i === currentPage ? 'text-primary underline font-bold' : ''}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center ">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 mx-1 text-primary font-bold"
      >
        &lt;
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-1 mx-1 text-primary font-bold"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
