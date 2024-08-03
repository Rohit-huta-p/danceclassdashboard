import axios from 'axios';
import React, { useMemo, useState } from 'react';
import { IoTriangle } from "react-icons/io5";
import { CiCircleInfo } from "react-icons/ci";

import axiosInstance from '../../axiosInstance';

const AllStudents = ({ students, setStudents }) => {
    const [filter, setFilter] = useState('all');
    const [popUpdate, setPopUpdate] = useState(false);
    const [feeHistoryModal, setFeeHistoryModal] = useState(false);
    const [feeHistory, setFeeHistory] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const [formData, setFormData] = useState({
      name: '',
      age: '',
      dateOfJoining: '',
      batch: '6:00pm - 7:00pm',
      feeStatus: 'pending',
      balance: 0,
      image: null
    });
    
    const getFilteredStudents = useMemo(() => {
        if (filter === 'pending') {
            const pendingStudents = students.filter((student) => student.feeStatus === 'pending');
         
            return pendingStudents
            
        } else if (filter === 'done') {
            console.log(students.filter((student) => student.feeStatus === 'done'));
            return students.filter((student) => student.feeStatus === 'done');
        } else {
            return students;
        }
    }, [filter, students]);

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
        console.log(formData.feeStatus);
        const updatedStudent = new FormData();
        updatedStudent.append('feeStatus', formData.feeStatus);
        
        const res = await axiosInstance.put(`/admin/updatestudent/${id}`, updatedStudent, {
          headers: {
            'Content-Type': 'multipart/form-data',
            },
        })
        console.log(res.data.data);
        const updatedStudentData = res.data.data;
        setStudents(students.map(student => (student._id === id ? updatedStudentData : student)));
      } catch (error) {
        
      }
    }

    

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


 
const downloadFeeHistory = async (id, student) => {
    try {

        openFeeHistoryModal(student);
        const response = await axios.get(`http://localhost:8000/api/admin/downloadFeeHistory/${id}`);
        setFeeHistory(response.data.feeHistory);
    } catch (error) {
        console.error('Download error:', error);
    }
};


    return (
        <div className="flex flex-col border-2 mt-5 p-5 h-screen">
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl mb-5'>All students</h1>
                <div>
                    <label htmlFor="filter">Sort By: </label>
                    <select
                        name="filter"
                        id="filter"
                        onChange={(e) => setFilter(e.target.value)}
                        value={filter}
                        className='bg-transparent text-purple-500 focus:outline-none'
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="done">Paid</option>
                    </select>
                </div>
            </div>

            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                       
                                {
                                   getFilteredStudents.length === 0 ? (
                                    <p className='text-center text-orange-400 w-full text-2xl'>All Pending</p>
                                   ) : (
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Image</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Name</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Age</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Contact</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Batch</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Fee Status</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Date Of Joining</th>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                    {/* STUDENT DATA */}
                                    {
                                    getFilteredStudents.map(student => (
                                        <tr key={student._id}>
                      
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                <div className='h-[4rem] w-[4rem] rounded-full' style={{ backgroundImage: `url(${student.Image})`, backgroundSize: 'cover' }}></div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">{student.name}</td>
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
                </div>
            </div>

            {popUpdate && selectedStudent && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white w-1/3 rounded-lg shadow-lg p-5 relative">
                        <button onClick={closeUpdateModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">X</button>
                        <h2 className="text-lg font-semibold mb-4">Update {selectedStudent.name}</h2>
                        <div className="flex items-center rounded w-full border px-3 py-2 mb-4">
                            <label htmlFor="feeStatus">Fee Status: </label>
                            <select
                                name="feeStatus"
                                className="ml-3 bg-amber-100 rounded px-3 py-1"
                                value={formData.feeStatus}
                                onChange={ (e) => handleInputChange(e)}
                            >
                                <option value="done">Done</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
                            onClick={() => {
                                UpdateStudent(selectedStudent._id);
                                closeUpdateModal();
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