import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

const StudentPagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        className={`mr-3 ${
          currentPage === 1 ? "disabled opacity-30" : ""
        } bg-white hover:bg-gray-100 text-gray-500 font-bold py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <MdKeyboardDoubleArrowLeft color="red" size={20} />
      </button>
      
      {getPageNumbers().map((page) => (
        <button
          key={page}
          className={`${
            currentPage === page
              ? "bg-indigo-500 text-white"
              : "bg-white text-gray-700"
          } border border-gray-300 hover:bg-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      
      <button
        className={`ml-3 ${
          currentPage === totalPages ? "disabled" : ""
        } bg-white border border-gray-300 hover:bg-gray-100 text-gray-500 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <MdKeyboardDoubleArrowRight color="red" size={20} />
      </button>
    </div>
  );
};

export default StudentPagination;