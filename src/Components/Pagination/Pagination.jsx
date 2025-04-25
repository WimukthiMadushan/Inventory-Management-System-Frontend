const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (!currentPage || !totalPages || !onPageChange) return null;
  if (currentPage < 1 || currentPage > totalPages) return null;
  if (totalPages <= 1) return null;
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 3;
    const sideDots = 1;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const start = Math.max(2, currentPage - sideDots);
      const end = Math.min(totalPages - 1, currentPage + sideDots);

      pages.push(1);
      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex justify-center mt-4 space-x-1 text-sm">
      <button
        className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Previous
      </button>

      {getPageNumbers().map((num, index) => (
        <button
          key={index}
          className={`px-3 py-1 rounded border ${
            num === "..."
              ? "border-transparent cursor-default"
              : num === currentPage
              ? "bg-blue-600 text-white border-blue-600"
              : "border-gray-300 hover:bg-gray-100"
          }`}
          onClick={() => typeof num === "number" && onPageChange(num)}
          disabled={num === "..."}
        >
          {num}
        </button>
      ))}

      <button
        className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
