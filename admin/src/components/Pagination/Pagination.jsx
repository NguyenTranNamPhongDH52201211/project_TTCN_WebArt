// src/components/Pagination.jsx
import React from 'react';
import './Pagination.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({
  currentPage = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange, // Callback: (newPage) => ...
  showInfo = true, // Show "Showing X to Y of Z"
  pageRange = 3, // Number of pages to show around current (e.g., 1 2 3 for current=2)
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);

  // Generate page numbers to display
  const pages = [];
  const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(totalPages, startPage + pageRange - 1);
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      {showInfo && (
        <div className="pagination-info">
          Showing {startItem} to {endItem} of {totalItems}
        </div>
      )}
      <div className="pagination-controls">
        <button
          className="page-button prev"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FiChevronLeft />
        </button>
        {pages.map((page) => (
          <button
            key={page}
            className={`page-button ${page === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="page-button next"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;