import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

function JobsPagination({ page, setPage, jobs, hasNextPage }) {
  const [pages, setPages] = useState([]);
  const [curPage, setCurPage] = useState(page);
  const lastPage = !!hasNextPage ? pages.length : null;
  console.log(lastPage);

  function changePage(amount) {
    setPage(page + amount);
    setCurPage(page + amount);
  }
  useEffect(() => {
    !pages.includes(page) && hasNextPage && setPages([...pages, page]);
  }, [page, jobs]);

  return (
    <>
      {jobs && (
        <Pagination>
          {page > 1 && (
            <Pagination.Prev
              onClick={() => {
                changePage(-1);
              }}
            />
          )}
          {pages.map((page) => (
            <>
              <Pagination.Item
                active={page === curPage}
                key={page}
                onClick={() => {
                  setPage(page);
                  setCurPage(page);
                }}
              >
                {page}
              </Pagination.Item>
            </>
          ))}
          {jobs && hasNextPage && lastPage ? (
            <Pagination.Next
              onClick={() => {
                changePage(1);
              }}
            />
          ) : null}
        </Pagination>
      )}
    </>
  );
}

export default JobsPagination;
