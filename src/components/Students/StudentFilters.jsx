import Search from "../../components/Search";
import Filter from "../../components/Filter";
import { FaDownload } from "react-icons/fa6";

const StudentFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  filter, 
  setFilter,
  onDownloadReport,
  filteredStudents
}) => {
  return (
    <div className="mb-3 md:mr-3 md:col-span-1 md:flex md:flex-col md:items-end">
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Filter filter={filter} setFilter={setFilter} />
      <button 
        onClick={() => onDownloadReport(filteredStudents)}
        className="mt-2 flex items-center gap-1 text-sm bg-blue-500 text-white px-3 py-1 rounded"
      >
        <FaDownload size={14} />
        Download Report
      </button>
    </div>
  );
};

export default StudentFilters;