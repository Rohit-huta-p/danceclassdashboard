import React, { useContext, useEffect, useMemo, useState } from 'react';
import { batch, useDispatch } from 'react-redux';
import { fetchUserDetails } from '../../slices/userSlice';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaCircleInfo } from "react-icons/fa6";
import { CiCircleCheck } from "react-icons/ci";
import axios from 'axios';
import Modal from './Modal';
import { GlobalContext } from '../../contexts/GlobalContexts';
import axiosInstance from '../../axiosInstance';

const Attendance = () => {
  const [filter, setFilter] = useState('all');
  const {batches} = useContext(GlobalContext)
  const batch = batches[filter]; // Get the batch time string using the filter key



  
  
  const [students, setStudents] = useState([]);
 
  let getFilteredStudents = [];
  

  getFilteredStudents = useMemo(() => {

    if (filter === 'A') {
        return students.filter((student) => student.batch === batch);
     
        
    } else if(filter === 'B'){
        // console.log(students.filter((student) => student.batch === '7:00pm - 8:00pm'));
        return students.filter((student) => student.batch === batch);
    } else {
      console.log(students);
      
      return students;
    }

}, [filter, students]);


//   const getFilteredStudents = useMemo(() => {
//     if (filter === '6:00pm - 7:00pm') {
//         const pendingStudents = students.filter((student) => student.batch === '6:00pm - 7:00pm');
     
//         return pendingStudents
        
//     } else if(filter === '7:00pm - 8:00pm'){
//         console.log(students.filter((student) => student.batch === '7:00pm - 8:00pm'));
//         return students.filter((student) => student.batch === '7:00pm - 8:00pm');
//     } else {
//       return students;
//     }
// }, [filter, students]);


  const [currStudent, setcurrStudent] = useState(null)
  const [missingAttendance, setMissingAttendance] = useState([])
  const [attendanceData, setAttendanceData] = useState([]);

  const [open, setOpen] = useState(false);
  // console.log(students);
  const fetchData = async () => {
    try {
      const res = await axiosInstance.get('/api/admin/students');
      console.log(res.data);
      
      setStudents(res.data.students);

      // Handle success, redirect or show a message
    } catch (err) {
      console.error('Upload error:', err);
      // Handle error, show error message
    }
  }

  useEffect(() => {
    fetchData();
    
  }, [])
  

  const handleAttendanceClick = (index, clickedType) => {
    const updatedStudents = [...students];
    updatedStudents[index].attendance = clickedType === "absent" ? 'absent' : 'present';
    const existingIndex = attendanceData.findIndex(item => item.id === updatedStudents[index]._id);


    if (existingIndex == -1) {
      setAttendanceData([...attendanceData, {
        id: updatedStudents[index]._id,
        attendance: clickedType === "absent" ? 'absent' : 'present',
        date: new Date()
      }]);

  
     
    } else {
      const updatedAttendanceData = [...attendanceData];
      updatedAttendanceData[existingIndex].attendance = clickedType === "absent" ? 'absent' : 'present';
      updatedAttendanceData[existingIndex].date = new Date().toISOString();
      setAttendanceData(updatedAttendanceData);
      
    }
  }
  
  const submitAttendance = async () => {
    
    try {


      const res = await axiosInstance.post("api/admin/students/attendance", attendanceData);

      const AttendanceDone = students.filter(student => attendanceData.find(data => data.id === student._id));
      
      // setMissingAttendance(studentsWithMissingAttendance);
      
    
      
      // setStudents(studentsWithMissingAttendance);
    
      // console.log("DATA" ,res.data);
    } catch (error) {
      
    }
  }

  const openModal =(id) => {
      setOpen(true);
      const currStudent = students.find(student => student._id == id);
      setcurrStudent(currStudent)
  }
  const closeModal =() => {
      setOpen(false);
  }
  
  return (
    <div>
      <div className='flex flex-col items-center mb-5'>
        <h1 className='text-4xl w-fit mb-4 mt-5'>Attendance</h1>
        <h2 className='font-bold bg-indigo-500 text-white px-3 w-fit py-2 rounded'>
          {new Date().toLocaleDateString('en-US', {
                  day: 'numeric',
                  year: 'numeric',
                  month: 'short',
              })}
        </h2>
        
      </div>
      {/* SORT BY */}
      <div className='text-end mr-4'>
            <label htmlFor="filter">Sort By: </label>
            <select
                name="filter"
                id="filter"
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
                className='bg-gray-200 p-1  focus:outline-none '
            >
                <option value="all">All</option>
                <option value="A">A. 6:00 - 7:00pm</option>
                <option value="B">B. 7:00 - 8:00pm</option>
            </select>
        </div>
      
  
      <div className='ml-4 mr-4 grid grid-cols-2 md:grid md:grid-cols-5 gap-2'>
        {

          getFilteredStudents.length === 0 ? (
            <div className='h-[50vh] w-screen'>
              <h2 className='text-center w-full mt-5'>Oops No Students Left</h2>
            </div>
          ) :
          getFilteredStudents.map((student, index) => (
            <div key={index} className={`relative bg-white p-4 rounded ${student.attendance === 'absent' ? 'bg-red-300' : 'bg-green-300'}`}>
              <div className='flex flex-col items-center'>
                {/* IMAGE */}
                <div className='h-[4rem] w-[4rem] rounded-full' style={{ backgroundImage: `url(${student.Image})`, backgroundSize: 'cover' }}></div>
                <h2 className=' mt-3'>{student.name}</h2>
              </div>
              <FaCircleInfo className='absolute top-4 right-4' onClick={() => openModal(student._id)}/>

              <div className='flex justify-evenly mt-5 bg-white'>
                <IoIosCloseCircleOutline size={45} color={student.attendance === 'absent' ? "red" : ""} className={ student.attendance === 'absent' ? `bg-red-300 border-2 py-2 w-full` : "border-2 py-2 w-full"}
                     onClick={() => handleAttendanceClick(index, "absent")}
                     />
                <CiCircleCheck size={45} color={student.attendance === 'present' ? "green" : ""} className={ student.attendance === 'present' ? `bg-green-300 border-2 py-2 w-full` : "border-2 py-2 w-full"}
                     onClick={() => handleAttendanceClick(index, "present")}
                     />
              </div>
              {
                open && (
                  <>
            
                  <Modal currStudent={currStudent} closeModal={closeModal}/>
                  </>
                )
              }
            </div>
            
            
          ))
        }
      </div>
      <div className='flex justify-center'>
        <button type='button' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mt-5 w-[95%]' onClick={submitAttendance}>Submit</button>
      </div>


      
    </div>

    
  )
};

export default Attendance;
