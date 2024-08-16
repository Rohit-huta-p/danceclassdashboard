import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
// ICONS
import { IoTriangle } from "react-icons/io5";
import { FaPhoneFlip } from "react-icons/fa6";
import { TiPencil } from "react-icons/ti";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";

// axiosInstatance
import axiosInstance from "../../axiosInstance";

// Components
import Filter from "../../components/Filter";
import { GlobalContext } from "../../contexts/GlobalContexts";
import Search from "../../components/Search";

const AllStudents = ({ students, setStudents }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [confirmDelete, setconfirmDelete] = useState(false);
  
  const [imageOpen, setimageOpen] = useState(false);
 const imageOpenfun = (student) => {
    setSelectedStudent(student);
    setimageOpen(true);
    
 }
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(8); // Adjust as needed
  const [totalPages, setTotalPages] = useState(0);  // Filter
  const [filter, setFilter] = useState("all");
  const { batches } = useContext(GlobalContext);

  // Modal
  const [popUpdate, setPopUpdate] = useState(false);
  const [feeHistoryModal, setFeeHistoryModal] = useState(false);

  // FeeHistory
  const [feeHistory, setFeeHistory] = useState([]);

  // Search
  const [searchTerm, setsearchTerm] = useState("");
  const searchStudents = () => {
    if (searchTerm) {
      let searchedStudents = students;
      return searchedStudents.filter(
        (student) =>
          // name
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          //   contact
          student.contact.includes(searchTerm.toLowerCase())
      );
    } else {
      return students;
    }
  };

  // Add student Data
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dateOfJoining: "",
    batch: "6:00pm - 7:00pm",
    feeStatus: "",
    balance: 0,
    image: null,
  });
  
  const [addSubtractbalance, setAddSubtractbalance] = useState('subtract')

  // Displayed students
  const displayedStudents = (students) =>
    students.slice(
      (currentPage - 1) * studentsPerPage,
      currentPage * studentsPerPage
    );

  // Filter students after search
  const filteredStudents = (searchedStudents, field, filter) => {
    let filteredStudents = [];
    if (filter === "all") {
      filteredStudents = searchedStudents;

    } else {
      filteredStudents = searchedStudents.filter(
        (student) => student[field] === filter
      );
    }



    const numPages = Math.ceil(filteredStudents.length / studentsPerPage);
    setTotalPages(numPages);
    return displayedStudents(filteredStudents);
  };

  // the final students displayed is in this list
  const getFilteredStudents = useMemo(() => {
    // searched students
    const searchedStudents = searchStudents();
    const batch = batches[filter];


    switch (filter) {
      case "pending":
        return filteredStudents(searchedStudents, "feeStatus", filter);
      case "paid":
        return filteredStudents(searchedStudents, "feeStatus", filter);
      case "A":
        return filteredStudents(searchedStudents, "batch", batch);
      case "B":
        return filteredStudents(searchedStudents, "batch", batch);

      default:
        return filteredStudents(searchedStudents, "", "all");
    }
  }, [filter, students, currentPage, studentsPerPage, searchTerm]);

  // DELETE STUDENTS
  const deleteStudent = async (id, name) => {
    try {
      if(confirmDelete){
        alert(`You are deleteing the ${name}?`);
        const res = await axiosInstance.delete(`/api/admin/deletestudent/${id}`);
        setStudents(students.filter((student) => student._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update Student
  const UpdateStudent = async (id) => {
    try {
      const updatedStudent = new FormData();

      updatedStudent.append("feeStatus", formData.feeStatus);
      updatedStudent.append("balance", formData.balance);
      if(addSubtractbalance === 'add'){
        updatedStudent.append("addSubtractBalance", "add");
      }else{
        updatedStudent.append("addSubtractBalance", "subtract");
      }

      const res = await axiosInstance.put(
        `/api/admin/updatestudent/${id}`,
        updatedStudent,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedStudentData = res.data.data;
      setStudents(
        students.map((student) =>
          student._id === id ? updatedStudentData : student
        )
      );
      closeUpdateModal();
    } catch (error) {}
  };

  // OPEN CLOSE MODAL
  // update modal
  const openUpdateModal = (student) => {
    setSelectedStudent(student);
    setPopUpdate(true);
  };
  const closeUpdateModal = () => {
    setSelectedStudent(null);
    setPopUpdate(false);
  };

  // update modal
  const openFeeHistoryModal = (student) => {
    setSelectedStudent(student);
    setFeeHistoryModal(true);
  };

  const closeFeeHistoryModal = () => {
    setSelectedStudent(null);
    setFeeHistoryModal(false);
  };

  //  FEE HISTORY
  const downloadFeeHistory = async (id, student) => {
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };


  const sendSms =  async (student) => {
    try {
      const data = {
        phone: student.contact,
        message: "HI, It's Rohit here. Kindly pay the fees remaining before" 
      }
      console.log(data);
      
      const res = await axiosInstance.post(`/send-sms`, data);
      console.log(res.data);
      
    } catch (error) {
      
    }
  }

  return (
    <div className="mt-5 h-screen z-10">
      <div className="p-2">
        <h1 className="text-3xl mb-5">All students</h1>

      
      </div>

      
      {/* container */}
      <div className="relative overflow-hidden flex flex-col items-center">
        {/* INCLUDES Search & cards */}
        <div className="md:flex ">
          {/* Search & filter */}
          <div className="mb-3 md:mr-3 ">
            <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
            <Filter filter={filter} setFilter={setFilter} />
          </div>

          {/* Cards & pagination */}
          <div className="">
            {/* cards */}
            <div className="md:mr-3">
            {getFilteredStudents.length === 0 ? (
              <p className="text-center text-orange-400 w-full text-2xl">
                No Students
              </p>
            ) : (
              <>
                <div className="grid gap-y-2 ">
                  {getFilteredStudents.map((student) => (
                    // Card
                    <div className="bg-white  rounded-lg p-3 w-[90vw] md:w-[70vw] shadow-lg">
                      {/* card header */}
                      <div className="relative flex items-center mb-3 text-sm font-medium text-gray-800">
                        {/* contact */}
                            <a
                            href={`tel:${student.contact}`}
                            className="absolute right-0">
                                <FaPhoneFlip color="blue" size={13} />
                            </a>
                        {/* image */}
                            <div
                            className="h-[3rem] w-[3rem] rounded-full mr-3"
                            style={{
                                backgroundImage: `url(${student.Image})`,
                                backgroundSize: "cover",
                            }}
                            onClick={() => imageOpenfun(student)}
                            ></div>
                        {/* name */}
                            <p className="text-base text-center">{student.name}</p>
                      </div>
                      {/* Card Body */}
                        {/* <button className="bg-red-200 rounded" onClick={() => sendSms(student)}>Notify Student</button> */}
                        {/* Fee status */}
                        <div className="flex items-center text-[13px] text-gray-800 mb-3">
                            <p className="inline-block mr-2">Fee Status: </p>
                           
                            {
                            student.balance > 0 ? (
                            // pending
                                <div className="flex items-center  rounded">
                                    <p className="text-amber-600 bg-amber-300/30 px-1 text-[12px]">Pending{" "} <span className="">({student.balance}/-)</span></p>
                                    <a onClick={() => downloadFeeHistory(student._id, student)}>
                                    </a>
                                        <CiCircleInfo
                                            size={16}
                                            color="blue"
                                            className="ml-2 cursor-pointer"
                                        />
                                </div>
                                ) : (
                            // paid
                                
                                  <div className="flex items-center ">
                                    <p className="bg-green-200 text-gray-500 px-1 rounded text-[12px]"> Paid{" "} </p>
                                    <a onClick={() => downloadFeeHistory(student._id, student)}>
                                        <CiCircleInfo
                                            size={16}
                                            color="blue"
                                            className="ml-2 cursor-pointer"
                                        />
                                    </a>
                                </div>
                                
                                )
                            }
                        </div>

                        <div className="flex justify-between">
                            <div className="flex">
                            {/* Age */}
                            <div className="mr-2 font-thin text-[9px] bg-blue-100/40 w-fit p-1  rounded-lg">
                                Age:{" "}
                                <span className="">{student.age}</span>
                            </div>
                            {/* batch */}
                            <div className="mr-2 font-thin text-[9px] bg-blue-200/40 w-fit p-1  rounded-lg">
                                <p>
                                Batch:{" "}
                                <span className="">{student.batch}</span>
                                </p>
                            </div>
                            {/* DOJ */}
                            <div className="p-1 font-thin text-[9px] bg-blue-200/40 w-fit p-1  rounded-lg ">
                                DOJ: {" "}
                                <span className="">
                                {new Date(
                                    student.dateOfJoining
                                ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                                </span>
                            </div>
                            </div>

                          
                            {/* update, Delete */}
                            <div className="flex-col text-end text-sm font-medium">
                            <button
                                type="button"
                                className="mr-3 inline text-xs font-semibold rounded-lg text-blue-600 hover:text-blue-800 disabled:opacity-50 "
                                onClick={() => openUpdateModal(student)}
                            >
                                <TiPencil size={17} />
                            </button>
                            <button
                                type="button"
                                className="inline text-xs font-semibold rounded-lg  text-red-600 hover:text-red-800 disabled:opacity-50"
                                onClick={() => {
                                  setconfirmDelete(true);
                                  deleteStudent(student._id, student.name)}}
                            >
                                <MdOutlineDelete size={17} />
                            </button>
                            </div>
                        </div>
                    </div>
                  ))}
                  
                </div>
              </>
            )}
          </div>
          {/* Pagination buttons */}


          <div className="flex justify-center mt-4">
            {/* Previous */}
              <button
                className={`mr-3 ${
                  currentPage === 1 ? "disabled opacity-30" : ""
                } bg-white hover:bg-gray-100 text-gray-500 font-bold py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                onClick={() => handlePagination(currentPage - 1)}
                disabled={currentPage === 1}
              >
            
                <MdKeyboardDoubleArrowLeft color="red" size={20} />
              </button>
            {/* Previous */}
              <div>
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    className={`${
                      currentPage === page
                        ? "bg-indigo-500 text-white"
                        : "bg-white text-gray-700"
                    } border border-gray-300 hover:bg-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>

            {/* Next */}
            <button
              className={`ml-3 ${
                currentPage === totalPages ? "disabled" : ""
              } bg-white border border-gray-300 hover:bg-gray-100 text-gray-500 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              onClick={() => handlePagination(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <MdKeyboardDoubleArrowRight color="red" size={20} />
            </button>
          </div>
        </div>
      </div>


        {
          imageOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white w-4/6 h-5/6 rounded-lg shadow-lg py-3 relative">
              <button
                onClick={() => {
                  closeFeeHistoryModal();
                  setimageOpen(false)
                }}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              >
                X
              </button>
              <img src={selectedStudent.Image} alt="image" className="w-full h-full object-contain"/>
            </div>
          </div>
          )
        }


     
      {popUpdate && selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white w-2/3 rounded-lg shadow-lg p-5 relative">
            {/* close modal */}
            <button
              onClick={closeUpdateModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              X
            </button>

            <h2 className="text-lg font-semibold mb-4">
              Update {selectedStudent.name}
            </h2>
            <div className="border rounded w-full px-3 py-2 mb-4">
              {/* <div className="flex mb-2">
                <label htmlFor="feeStatus">Fee Status: </label>
                <select
                  name="feeStatus"
                  className="ml-3 bg-amber-100 rounded px-1 "
                  value={formData.feeStatus}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                </select>
              </div> */}
              <div className="flex mb-3">
                <label htmlFor="feeStatus" className="mr-2" >Balance: </label>
                <div className="flex items-center">
                  <IoIosAddCircleOutline color="blue" size={20} className={`mr-1 cursor-pointer ${addSubtractbalance === 'add' && 'bg-blue-200 rounded '}`} onClick={() => setAddSubtractbalance('add')}/>
                  <CiCircleMinus color="red" size={20} className={`cursor-pointer ${addSubtractbalance === 'subtract' && 'bg-red-200 rounded '}`} onClick={() => setAddSubtractbalance('subtract')}/>
                </div>
                  <input type="number" name="balance" placeholder="0" className="ml-3 font-thin w-full outline-none" 
                  value={formData.balance}
                  onChange={(e) => handleInputChange(e)}/>
                 
              </div>
            </div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
              onClick={() => {
                UpdateStudent(selectedStudent._id);
              }}
            >
              Update
            </button>
          </div>
        </div>
      )}

      {feeHistoryModal && selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white w-1/3 rounded-lg shadow-lg p-5 relative">
            <button
              onClick={closeFeeHistoryModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              X
            </button>
            <h2 className="text-lg font-semibold mb-4">
              Fee History {selectedStudent.name}
            </h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {feeHistory.map((entry) => (
                  <tr key={entry._id}>
                    <td className="py-2 px-4 border-b">{entry.status}</td>
                    <td className="py-2 px-4 border-b">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default AllStudents;
