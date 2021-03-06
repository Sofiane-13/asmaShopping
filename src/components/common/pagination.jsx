import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;

  let pages;
  let begin;
  let end;
  begin = currentPage - 2;
  end = currentPage + 2;
  if (begin < 1) begin = 1;
  if (end > pagesCount) end = pagesCount;

  pages = _.range(begin, end + 1);

  return (
    <nav>
      <ul
        className="pagination"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {pages.map(page => (
          <li
            style={{ cursor: "pointer" }}
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
