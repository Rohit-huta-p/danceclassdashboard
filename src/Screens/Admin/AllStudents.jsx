import axios from 'axios';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { IoTriangle } from "react-icons/io5";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { CiCircleInfo } from "react-icons/ci";
import axiosInstance from '../../axiosInstance';

import { Table } from './Table';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import Filter from '../../components/Filter';
import { GlobalContext } from '../../contexts/GlobalContexts';
import Search from '../../components/Search';



const AllStudents = ({ students, setStudents }) => {
// Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage, setStudentsPerPage] = useState(2); // Adjust as needed
    const [totalPages, setTotalPages] = useState(0);
  
    const [filter, setFilter] = useState('all');
    const [popUpdate, setPopUpdate] = useState(false);
    const [feeHistoryModal, setFeeHistoryModal] = useState(false);
    const [feeHistory, setFeeHistory] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

// Search
    const [searchTerm, setsearchTerm] = useState('')
   



    const [formData, setFormData] = useState({
      name: '',
      age: '',
      dateOfJoining: '',
      batch: '6:00pm - 7:00pm',
      feeStatus: 'pending',
      balance: 0,
      image: null
    });


    const displayedStudents = (students) => ( 
        students.slice(
        (currentPage - 1) * studentsPerPage,  
        currentPage * studentsPerPage
      ));  

   

      const searchStudents = () => {
          if (searchTerm) {
            let searchedStudents = students;
            return searchedStudents.filter((student) =>
                // name
              student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            //   contact
              student.contact.includes(searchTerm.toLowerCase())
            );
        }else{
            return students
        }
      }
      const {batches} = useContext(GlobalContext)

      const filteredStudents = (searchedStudents, field ,filter) => {
    
        
        let filteredStudents = [];
        if(filter === 'all'){
            
            filteredStudents = searchedStudents;
            console.log("ALL option: ", filteredStudents);
        }else{
            filteredStudents = searchedStudents.filter((student) => 
                student[field] === filter 
            );
        }

        console.log("FILTERED STUDENTS", filteredStudents);
        
        const numPages = Math.ceil(filteredStudents.length / studentsPerPage);
        setTotalPages(numPages);
        return displayedStudents(filteredStudents);
      }
    const getFilteredStudents = useMemo(() => {
        // searched students
        const searchedStudents = searchStudents();
        const batch = batches[filter];
        console.log(batch, filter);

        switch (filter) {
            case 'pending':
                return filteredStudents(searchedStudents, 'feeStatus', filter);
            case 'paid':
                return  filteredStudents(searchedStudents, 'feeStatus', filter);
            case 'A':
                return filteredStudents(searchedStudents, 'batch', batch);
            case 'B':
                return filteredStudents(searchedStudents, 'batch', batch);
               
            default:
                return filteredStudents(searchedStudents, '', 'all');;
        }
        
        // if (filter === 'pending' || filter==='A') {
         
            
        // } else if (filter === 'paid') {
        //     const paidStudents = searchedStudents.filter((student) =>
        //          student.feeStatus === 'paid' ||
        //          student.batch === batch
        //     );
        //     const numPages = Math.ceil(paidStudents.length / studentsPerPage);
        //     setTotalPages(numPages);
        //     return displayedStudents(paidStudents);
        // } else {
        //     const numPages = Math.ceil(students.length / studentsPerPage);
        //     setTotalPages(numPages);

        //     return displayedStudents(searchedStudents);
        // }
    }, [filter, students, currentPage,studentsPerPage, searchTerm]);

    const deleteStudent = async (id) => {
        try {
            const res = await axiosInstance.delete(`/api/admin/deletestudent/${id}`);
            setStudents(students.filter((student) => student._id !== id));
        } catch (error) {
            console.log(error);
        }
    };
    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      
    };
    const UpdateStudent = async (id) => {
        try {
            
        const updatedStudent = new FormData();
        
        updatedStudent.append('feeStatus', formData.feeStatus);

        
        const res = await axiosInstance.put(`/api/admin/updatestudent/${id}`, updatedStudent, {
          headers: {
            'Content-Type': 'multipart/form-data',
            },
        })

        const updatedStudentData = res.data.data;
        setStudents(students.map(student => (student._id === id ? updatedStudentData : student)));
        closeUpdateModal()
      } catch (error) {
        
      }
    }

    
// OPEN CLOSE MODAL
    const openUpdateModal = (student) => {
        setSelectedStudent(student);
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


//  FEE HISTORY
const downloadFeeHistory = async (id, student) => {
    try {

        openFeeHistoryModal(student);
        const response = await axiosInstance.get(`/api/admin/downloadFeeHistory/${id}`);
        setFeeHistory(response.data.feeHistory);
    } catch (error) {
        console.error('Download error:', error);
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
  
  // Function to handle pagination logic (e.g., fetch more data if needed)
  const handlePagination = (page) => {
    // Implement your logic to fetch or retrieve data for the desired page  
    // Update `students` state accordingly
    setCurrentPage(page);
  };  



    return (
        <div className="flex flex-col border-2 mt-5 p-5 h-screen">
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl mb-5'>All students</h1>
                
            </div>
{/* <Table students={students}/> */}

 

{/* Table */}

{/* Search & filter */}
            <div className='flex justify-between items-center'>
                <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm}/>

            {/* Filter */}
                <div>
                    {/* <Filter filter={filter} setFilter={setFilter}/> */}
                    <select
                        name="filter"
                        id="filter"
                        onChange={(e) => setFilter(e.target.value)}
                        value={filter}
                        className='bg-transparent text-purple-500 focus:outline-none'
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                    </select>
                    <select
                        name="filter"
                        id="filter"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className='bg-transparent text-purple-500 focus:outline-none'
                    >
                        <option value="" disabled>Batch</option>
                        <option value="all">All</option>
                        <option value="A">A. 6:00 - 7:00pm</option>
                        <option value="B">B. 7:00 - 8:00pm</option>
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto">
                <div className=" min-w-full inline-block align-middle">
                    <div className="bg-white rounded-[2rem] p-2 overflow-hidden">
                        {
                            getFilteredStudents.length === 0 ? (
                            <p className='text-center text-orange-400 w-full text-2xl'>No Students</p>
                            ) : (
                            <table className="min-w-full divide-y divide-gray-200   dark:divide-neutral-700">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Name</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Age</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Contact</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Batch</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Fee Status</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Date Of Joining</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y font-thin divide-gray-200 dark:divide-neutral-700">
                            {/* STUDENT DATA */}
                            {
                            getFilteredStudents.map(student => (
                                <tr key={student._id}>
                
                                    <td className="flex items-center px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                                        <div className='h-[3rem] w-[3rem] rounded-full mr-3' style={{ backgroundImage: `url(${student.Image})`, backgroundSize: 'cover' }}></div>
                                        <p className='font-thin'> {student.name}</p>
                                 
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{student.age}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"><a href={`tel:${student.contact}`}>{student.contact}</a></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{student.batch}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                                        {/* pending */}
                                        {student.feeStatus === 'pending' ? (
                                            <div className='flex items-center '>
                                                <p className='text-amber-600 animate-pulse'>• Pending </p> 
                                                <a onClick={() => downloadFeeHistory(student._id, student)}><CiCircleInfo size={16} color='blue' className='ml-2'/></a>                                                </div>  
                                        ) : 
                                        // done
                                        (
                                            <div className='flex items-center '>
                                                <p className='bg-green-200 py-1 px-4 rounded'>Paid </p> 
                                                <a onClick={() => downloadFeeHistory(student._id, student)}><CiCircleInfo size={16} color='blue' className='ml-2'/></a>
                                            </div>  
                                        )}
                            
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                                        {new Date(student.dateOfJoining).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </td>
                                    <td className="flex-col px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                        <button type="button" className="mr-3 inline text-sm font-semibold rounded-lg text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400"
                                            onClick={() => openUpdateModal(student)}
                                        >
                                            Update
                                        </button>
                                        <button type="button" className="inline text-sm font-semibold rounded-lg  text-red-600 hover:text-red-800 disabled:opacity-50"
                                            onClick={() => deleteStudent(student._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>

                                
                                ))
                            }
                                </tbody>
                            </table>
                            )
                        }
                        
                    </div>
                     {/* Pagination buttons */}
        <div className="flex justify-evenly mt-4">
          <button
            className={`disabled:opacity-50 ${
              currentPage === 1 ? 'disabled' : ''
            } bg-white border border-gray-300 hover:bg-gray-100 text-gray-500 font-bold py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            onClick={() => handlePagination(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {/* Previous */}
            <MdKeyboardDoubleArrowLeft color='red' size={20}/>
          </button>
          <div>
          {getPageNumbers().map(page => (
                    <button
                        key={page}
                        className={`${
                            currentPage === page ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700'
                        } border border-gray-300 hover:bg-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>


        {/* Previous */}
          <button
            className={`disabled:opacity-50 ${
              currentPage === totalPages ? 'disabled' : ''
            } bg-white border border-gray-300 hover:bg-gray-100 text-gray-500 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            onClick={() => handlePagination(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <MdKeyboardDoubleArrowRight color='red' size={20} />
          </button>
        </div>
  
                    
                </div>
            </div>

            {popUpdate && selectedStudent && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white w-2/3 rounded-lg shadow-lg p-5 relative">
                    {/* close modal */}
                        <button onClick={closeUpdateModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">X</button>
                    
                        <h2 className="text-lg font-semibold mb-4">Update {selectedStudent.name}</h2>
                        <div className="flex rounded w-full border px-3 py-2 mb-4">
                            <label htmlFor="feeStatus">Fee Status: </label>
                            <select
                                name="feeStatus"
                                className="ml-3 bg-amber-100 rounded px-3 py-1"
                                value={formData.feeStatus}
                                onChange={ (e) => handleInputChange(e)}
                            >
                                <option value="paid">Paid</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
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
                        <button onClick={closeFeeHistoryModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">X</button>
                        <h2 className="text-lg font-semibold mb-4">Fee History {selectedStudent.name}</h2>
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
                            {new Date(entry.date).toLocaleDateString('en-US', {
                                month: 'long',
                                    year: 'numeric',
                                    day: 'numeric',
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
    );
};

export default AllStudents;
