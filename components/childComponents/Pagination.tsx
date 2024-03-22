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
  const memoizedPagination = useMemo(
    () => (
      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Seguinte"}
        pageCount={pageCount}
        onPageChange={onPageChange}
        containerClassName={"flex justify-center"}
        activeClassName={"font-bold"}
        previousLinkClassName={
          "py-2 px-3 bg-gray-200 text-gray-700 mr-2 text-sm"
        }
        nextLinkClassName={"py-2 px-3 bg-gray-200 text-gray-700 ml-2 text-sm"}
        pageClassName={
          "py-2 px-3 bg-gray-200 text-gray-700 mx-1 mt-[-6px] text-sm"
        }
        breakClassName={"hidden"}
      />
    ),
    [pageCount, onPageChange]
  );

  return <div>{memoizedPagination}</div>;
};

export default Pagination;