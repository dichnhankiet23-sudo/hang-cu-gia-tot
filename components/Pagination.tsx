
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const maxPagesToShow = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center my-8">
      <ul className="flex items-center space-x-2">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &lt;
          </button>
        </li>

        {startPage > 1 && (
          <>
            <li>
              <button onClick={() => onPageChange(1)} className="px-4 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-100">1</button>
            </li>
            {startPage > 2 && <li className="px-4 py-2">...</li>}
          </>
        )}

        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`px-4 py-2 border rounded-md ${
                currentPage === number
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {number}
            </button>
          </li>
        ))}

        {endPage < totalPages && (
           <>
            {endPage < totalPages - 1 && <li className="px-4 py-2">...</li>}
            <li>
              <button onClick={() => onPageChange(totalPages)} className="px-4 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-100">{totalPages}</button>
            </li>
          </>
        )}

        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
