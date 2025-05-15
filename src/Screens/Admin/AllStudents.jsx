import React, { useContext, useEffect, useMemo, useState } from "react";

import { GlobalContext } from "../../contexts/GlobalContexts";
import axiosInstance from "../../axiosInstance";

// Components
import StudentCard from "../../components/Students/StudentCard";
import UpdateStudentModal from "../Admin/Home/UpdateStudent/Update_Modal";
import FeeHistoryModal from "../../components/Students/FeeHistoryModal";
import ImageModal from "../../components/Students/ImageModal";
import StudentPagination from "../../components/Students/StudentPagination";
import StudentFilters from "../../components/Students/StudentFilters";

const AllStudents = ({ students, setStudents }) => {
  const { batches, batchTitles } = useContext(GlobalContext);
  
  // State management
  const [showMessage, setShowMessage] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);


  const [popUpdate, setPopUpdate] = useState(false);

  const [imageOpen, setImageOpen] = useState(false);

  // FEE HISTORY
  const [feeHistoryModal, setFeeHistoryModal] = useState(false);
  const [feeHistory, setFeeHistory] = useState([]);

  // SEARCH STATE
  const [searchTerm, setSearchTerm] = useState("");
  
  // PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(0);

  // FILTER STATES
  const [filter, setFilter] = useState("all");
  
  // MODAL STATES
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dateOfJoining: "",
    contact: "",
    batch: "6:00pm - 7:00pm",
    fees: "",
    feesPaid: "",
    image: null,
  });

  // Helper functions
  const searchStudents = () => {
    if (!searchTerm) return students;
    
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.contact.includes(searchTerm.toLowerCase())
    );
  };


  // Displayed Students
  const displayedStudents = (students) =>
    students.slice(
      (currentPage - 1) * studentsPerPage,
      currentPage * studentsPerPage
    );

    // Filter Students with searched students
  const filterStudents = (searchedStudents, filter) => {
    let filteredStudents = [];
    
    if (filter === "all") {
      filteredStudents = searchedStudents;
    } else if (filter === "pending" || filter === "paid") {
      filteredStudents = searchedStudents.filter((student) =>
        filter === "pending"
          ? student.fees - student.feesPaid > 0
          : student.fees - student.feesPaid <= 0
      );
    } else {
      filteredStudents = searchedStudents.filter(
        (student) => student.batch === filter
      );
    }

    const numPages = Math.ceil(filteredStudents.length / studentsPerPage);
    setTotalPages(numPages);
    return displayedStudents(filteredStudents);
  };


  // Final Filtered Students
  const getFilteredStudents = useMemo(() => {
    const searchedStudents = searchStudents();
    console.log(filter);
    
    if (filter !== "pending" && filter !== "paid") {
      for (const batch of batches) {
        if (filter === batch.batchTitle) {
          return filterStudents(searchedStudents, filter);
        }
      }
      return filterStudents(searchedStudents, "all");
    }
    return filterStudents(searchedStudents, filter);
  }, [filter, students, currentPage, studentsPerPage, searchTerm]);

  // API calls
  const deleteStudent = async (id, name) => {
    try {
        alert(`You are deleting ${name}?`);
        await axiosInstance.delete(`/api/admin/deletestudent/${id}`);
        const studentsAfterDeleting = students.filter((student) => student._id !== id);
        setStudents(studentsAfterDeleting);

    } catch (error) {
      console.log(error);
    }
  };

  const updateStudent = async (id) => {
    try {
      const uploadData = new FormData();
      uploadData.append("name", formData.name);
      uploadData.append("age", formData.age);
      uploadData.append("contact", formData.contact);
      uploadData.append("batch", formData.batch);
      uploadData.append("dateOfJoining", formData.dateOfJoining);
      uploadData.append("feesPaid", formData.feesPaid);
      uploadData.append("fees", formData.fees);
      console.log("UPATED DATA",uploadData.values);
      
      const res = await axiosInstance.put(
        `/api/admin/updateStudent/${id}`,
        uploadData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const { success, data } = res.data;
      setShowMessage(success);
      setStudents(
        students.map((student) =>
          student._id === id ? data : student
        )
      );
      closeUpdateModal();
    } catch (error) {
      console.error(error);
    }
  };

  const showFeeHistory = async (id, student) => {
    try {
      openFeeHistoryModal(student);
      const response = await axiosInstance.get(
        `/api/admin/downloadFeeHistory/${id}`
      );
      setFeeHistory(response.data.feeHistory);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  const downloadMonthlyReport = async (students) => {
    try {
      // PDF download logic...
    } catch (error) {
      console.error("Error downloading the PDF:", error);
    }
  };

  // Modal handlers
  const openUpdateModal = (student) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      age: student.age,
      contact: student.contact,
      batch: student.batch,
      dateOfJoining: student.dateOfJoining,
      feesPaid: student.feesPaid,
      fees: student.fees,
    });
    setPopUpdate(true);
  };

  const closeUpdateModal = () => {
    setSelectedStudent(null);
    setPopUpdate(false);
  };

  const openFeeHistoryModal = (student) => {
    setSelectedStudent(student);
    setFeeHistoryModal(true);
  };

  const closeFeeHistoryModal = () => {
    setSelectedStudent(null);
    setFeeHistoryModal(false);
  };

  const imageOpenFun = (student) => {
    setSelectedStudent(student);
    setImageOpen(true);
  };

  const closeImageModal = () => {
    setImageOpen(false);
    setSelectedStudent(null);
  };
  

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <div className="mt-5 h-screen z-10">
      <div className="p-2">
        <h1 className="text-3xl mb-5">All students</h1>
      </div>

      <div className="">
        <div className="mx-2 flex flex-col md:grid md:grid-cols-6">
          <StudentFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filter={filter}
            setFilter={setFilter}
            onDownloadReport={downloadMonthlyReport}
            filteredStudents={getFilteredStudents}
          />

          <div className="max-xsm:w-1/12 md:col-span-5">
            {getFilteredStudents.length <= 0 ? (
              <p className="text-center text-orange-400 w-full text-2xl">
                No {filter} students
              </p>
            ) : (
              <div className="grid gap-y-2">
                {getFilteredStudents.map((student) => (
                  <StudentCard
                    key={student._id}
                    student={student}
                    onUpdate={openUpdateModal}
                    onDelete={deleteStudent}
                    onShowFeeHistory={showFeeHistory}
                    onCallStudent={() => window.location.href = `tel:${student.contact}`}
                    onImageClick={imageOpenFun}
                    isUpdated={showMessage && student._id === selectedStudent?._id}
                  />
                ))}
              </div>
            )}

            <StudentPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {imageOpen && selectedStudent && (
          <ImageModal student={selectedStudent} onClose={closeImageModal} />
        )}

        {popUpdate && selectedStudent && (
          <UpdateStudentModal
            student={selectedStudent}
            onClose={closeUpdateModal}
            onUpdate={updateStudent}
            batches={batches}
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {feeHistoryModal && selectedStudent && (
          <FeeHistoryModal
            student={selectedStudent}
            feeHistory={feeHistory}
            onClose={closeFeeHistoryModal}
          />
        )}
      </div>
    </div>
  );
};

export default AllStudents;