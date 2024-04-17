/**
 * Renders a pagination component with ReactPaginate.
 *
 * @param {Object} props - The props for the component.
 * @param {number} props.pageCount - The total number of pages.
 * @param {number} props.currentPage - The current active page.
 * @param {Function} props.onPageChange - The callback when a page is changed.
 *
 * @returns {JSX.Element} - The rendered pagination component.
 */

import ReactPaginate from "react-paginate";
import { useMemo } from "react";

const Pagination = ({
  pageCount,
  currentPage,
  onPageChange,
}: {
  pageCount: number;
  currentPage: number;
  onPageChange: any;
}) => {
  const memoizedPagination = useMemo(() => {
    if (pageCount > 0) {
      return (
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Seguinte"}
          pageCount={pageCount}
          onPageChange={onPageChange}
          containerClassName={"flex justify-center"}
          activeClassName={"font-bold"}
          previousLinkClassName={
            "join-item btn btn-outline btn-sm text-sm text-gray-400"
          }
          nextLinkClassName={
            "join-item btn btn-outline btn-sm text-sm text-gray-400"
          }
          pageClassName={
            "join-item btn btn-outline btn-sm text-sm text-gray-400"
          }
          breakClassName={"hidden"}
        />
      );
    } else {
      return null; // Render nothing if pageCount is 0
    }
  }, [pageCount, onPageChange]);

  return <div>{memoizedPagination}</div>;
};

export default Pagination;
