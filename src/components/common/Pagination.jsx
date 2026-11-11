
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('left-ellipsis');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('right-ellipsis');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="common-pagination">
      <button
        type="button"
        className="common-pagination-arrow"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
        <span>Previous</span>
      </button>

      <div className="common-pagination-pages">
        {getPages().map((page, index) => {
          if (typeof page === 'string') {
            return (
              <span
                key={page}
                className="common-pagination-ellipsis"
              >
                <MoreHorizontal size={18} />
              </span>
            );
          }

          return (
            <button
              type="button"
              key={`${page}-${index}`}
              className={`common-pagination-page ${
                currentPage === page ? 'active' : ''
              }`}
              onClick={() => onPageChange(page)}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="common-pagination-arrow"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <span>Next</span>
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

export default Pagination;
