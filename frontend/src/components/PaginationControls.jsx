import React from "react";

export const PaginationControls = ({ page, totalPages, onPrev, onNext }) => {
  return (
    <div className="pagination-controls">
      <button
        className="pagination-btn"
        onClick={onPrev}
        disabled={page <= 1}
      >
        Previous
      </button>
      <span className="pagination-info">
        Page {page} of {totalPages}
      </span>
      <button
        className="pagination-btn"
        onClick={onNext}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
};
