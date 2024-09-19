import React,{memo} from 'react';

const PaginationControl = memo(({ currentPage, pagination, handlePageChange, isNextDisabled }) => {
  return (
    <tr>
      <td colSpan={4} className="text-end">
        <button
        className='btn'
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span> 
          Page {currentPage} of {pagination.totalPages} | Total Items: {pagination.total}
        </span>
        <button
        className='btn'
          disabled={isNextDisabled || currentPage === pagination.totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </td>
    </tr>
  );
});

export default PaginationControl;
