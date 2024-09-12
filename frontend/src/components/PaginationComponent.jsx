import React, { useContext } from 'react';

import { useBlog } from '../context/Blog';

const PaginationComponent = () => {
  const { page, setPage, paginationData, pageSize, setPageSize } = useBlog();
  console.log(paginationData);
  const totalPages = paginationData?.totalPages;
  let pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  pages.unshift(page - 1 > 1 ? pages - 1 : 1);
  pages.unshift(1);
  pages.push(page + 1 <= totalPages ? page + 1 : totalPages);
  pages.push(totalPages);
  console.log(pages);

  return (
    <div className="flex items-center justify-center mt-3">
      <nav aria-label="Page navigation">
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <select
              className="px-3 py-2 border border-gray-300 bg-white text-gray-700"
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </li>
          {pages.map((item, index) => (
            <li key={index}>
              <button
                className={`px-3 py-2 border border-gray-300 ${
                  (index < 2 && page === 1) ||
                  (index >= pages.length - 2 && page === totalPages)
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:bg-gray-200'
                } ${
                  index === page + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700'
                }`}
                disabled={
                  (index < 2 && page === 1) ||
                  (index >= pages.length - 2 && page === totalPages)
                }
                onClick={() => setPage(item)}
              >
                {index === 0 && 'First'}
                {index === 1 && 'Previous'}
                {index >= 2 && index < pages.length - 2 && item}
                {index === pages.length - 2 && 'Next'}
                {index === pages.length - 1 && 'Last'}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default PaginationComponent;
