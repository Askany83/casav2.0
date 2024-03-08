import ReactPaginate from "react-paginate";

const Pagination = ({
  pageCount,
  currentPage,
  onPageChange,
}: {
  pageCount: number;
  currentPage: number;
  onPageChange: any;
}) => {
  return (
    <div>
      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Seguinte"}
        pageCount={pageCount}
        onPageChange={onPageChange}
        containerClassName={"flex justify-center"}
        activeClassName={"font-bold"}
        previousLinkClassName={"py-2 px-3 bg-gray-200 text-gray-700 mr-2"}
        nextLinkClassName={"py-2 px-3 bg-gray-200 text-gray-700 ml-2"}
        pageClassName={"py-2 px-3 bg-gray-200 text-gray-700 mx-1 mt-[-8px]"}
        breakClassName={"hidden"}
      />
    </div>
  );
};

export default Pagination;
