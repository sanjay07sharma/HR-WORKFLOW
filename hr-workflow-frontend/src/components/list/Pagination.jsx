import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../common';

const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { page, totalPages, total, limit, hasMore, hasPrev } = pagination;

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg">
      {/* Info */}
      <div className="text-sm text-gray-600">
        Showing <span className="font-medium">{startItem}</span> to{' '}
        <span className="font-medium">{endItem}</span> of{' '}
        <span className="font-medium">{total}</span> tasks
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={!hasPrev}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (page <= 3) {
              pageNum = i + 1;
            } else if (page >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = page - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                  pageNum === page
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <Button
          variant="secondary"
          size="sm"
          disabled={!hasMore}
          onClick={() => onPageChange(page + 1)}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
