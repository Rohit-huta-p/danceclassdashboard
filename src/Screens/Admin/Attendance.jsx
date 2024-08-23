import React, { useContext, useEffect, useMemo, useState } from 'react';
import { batch, useDispatch } from 'react-redux';
import { fetchUserDetails } from '../../slices/userSlice';

// ICONS
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LuRefreshCcw } from "react-icons/lu";
import { FaCircleInfo } from "react-icons/fa6";
import { CiCircleCheck } from "react-icons/ci";
import Modal from './Modal';
import { GlobalContext } from '../../contexts/GlobalContexts';
import axiosInstance from '../../axiosInstance';
import Search from '../../components/Search';

const Attendance = () => {
  const [filter, setFilter] = useState('all');

  const {batches} = useContext(GlobalContext)
  const [searchTerm, setsearchTerm] = useState('')
  
  const [enable, setenable] = useState(false)
  const batch = batches[filter];


  
  
  const [students, setStudents] = useState([]);
 
  let getFilteredStudents = [];
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


  getFilteredStudents = useMemo(() => {
    const searchedStudents = searchStudents();
    if (filter === 'A') {
        return searchedStudents.filter((student) => student.batch === batch);
     
        
    } else if(filter === 'B'){
        // console.log(students.filter((student) => student.batch === '7:00pm - 8:00pm'));
        return searchedStudents.filter((student) => student.batch === batch);
    } else {
      // console.log(students);
      return searchedStudents;
    }

    
}, [filter, students, searchTerm]);

  const [currStudent, setcurrStudent] = useState(null)
  const [attendanceData, setAttendanceData] = useState([]);

  const [open, setOpen] = useState(false);


  const [refreshRotate, setRefreshRotate] = useState(false)
  
  const refresh = async() => {
    setRefreshRotate(true); // Start the spinning animation
    try {
      const res = await axiosInstance.get('/api/admin/students');
      setStudents(res.data.students);
    } finally {
      setRefreshRotate(false); // Stop the spinning animation
    }
  }
  
  
  useEffect(() => {
  
    refresh();
 
  }, [])
  
  

  const handleAttendanceClick = (student ,index, clickedType) => {
    
    const updatedStudents = [...students];
    // console.log("curent clicked: ",updatedStudents[index]);

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
      updatedAttendanceData[existingIndex].date = new Date();
      setAttendanceData(updatedAttendanceData);
      
    }
  }
  console.log("ATTENDANCE DATA",attendanceData);
  
  const submitAttendance = async () => {
    
    try {
    console.log("Attendance Data: Submitted: ", attendanceData);
    

      const res = await axiosInstance.post("api/admin/students/attendance", attendanceData);
      setAttendanceData([])
      refresh();
      setRefreshRotate(false)

      
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

  const today = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    year: 'numeric',
    month: 'short',
  });

  console.log(students);
  
  const getAttendanceForToday = (attendance) => {

      
    // attendance.map(att => console.log(att.date))
  
    if (!Array.isArray(attendance)) {
      // console.error("Expected an array for attendance but got:", attendance);
      return null;
    }
  
    return attendance.find(att => 
      new Date(att.date).toLocaleDateString('en-US', {
        day: 'numeric',
        year: 'numeric',
        month: 'short',
      }) === today
    );
  };




  
  
  return (
    <div>
      <div className='flex flex-col items-center mb-5'>
        <h1 className='text-4xl w-fit mb-4 mt-5 '>Attendance</h1>
        <h2 className='font-bold bg-indigo-500 text-white px-3 w-fit py-2 rounded'>
          {new Date().toLocaleDateString('en-US', {
                  day: 'numeric',
                  year: 'numeric',
                  month: 'short',
              })}
        </h2>
        
      </div>
      {/* SORT BY */}
      <div className='p-2'>
        <div>
          <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm}/>
        </div>
        {/* SORTBY, REFRESH, ENABLE */}
        <div className='flex justify-between items-center '>
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
          {/* REFRESH, ENABLE */}
            <div className='flex items-center '>
                <div className=''>

                  <button onClick={() => setenable(!enable)} className='mr-3'>
                    <div className='shadow-lg'>
                      <div 
                        className={`rounded w-[34px] h-[14px] relative bg-gradient-to-r from-blue-200 to-white
                                  transition-all duration-300`}
                        > 
                        <div className={`bg-blue-500 w-[21px] h-[21px] rounded-full absolute top-[-3px]  
                          transition-transform duration-300 ${enable ? 'translate-x-[14px]' : 'translate-x-[-2px]'}`}></div>
                      </div>
                    </div>
                  </button>
                </div>


              <LuRefreshCcw size={18} 
              className={`transition-transform duration-300 ${refreshRotate ? 'animate-spinFast' : ''}`}
              onClick={refresh}/>
            </div>
        </div>
      </div>
      
  
      <div className='ml-4 mr-4 grid grid-cols-2 md:grid md:grid-cols-5 gap-2'>
        {

          getFilteredStudents.length === 0 ? (
            <div className='h-[50vh] w-screen'>
              <h2 className='text-center text-amber-600 text-3xl w-full mt-5'>No Students</h2>
            </div>
          ) :
          getFilteredStudents.map((student, index) => {
            const todayAttendance = getAttendanceForToday(student.attendance);
            const cardColor = todayAttendance ? 
                              (todayAttendance.status === 'absent' ? 'bg-red-300' : 'bg-green-300') : 
                              'bg-white';
            return (
            <div key={index} className={`relative  p-4 rounded  z-10 ${cardColor}`}>
      
              <div className='flex flex-col items-center'>
                {/* IMAGE */}
                <div
                  className="h-[3rem] w-[3rem] rounded-full mr-3"
                  style={{
                      backgroundImage: `url(${student.Image})`,
                      backgroundSize: "cover",
                  }}
                  ></div>
                <h2 className=' mt-3'>{student.name}</h2>
              </div>
              <FaCircleInfo className='absolute top-4 right-4 cursor-pointer' onClick={() => openModal(student._id)}/>

              <div className='flex justify-evenly mt-5 bg-white'>

              {/*  */}
                <IoIosCloseCircleOutline size={45} color="red" className={ student.attendance === 'absent' ? `bg-red-300 border-2 py-2 w-full` : "border-2 py-2 w-full"}
                     onClick={() => handleAttendanceClick(student,index, "absent")}
                     />
{/*  */}
                <CiCircleCheck size={45} color="green" className={ student.attendance === 'present' ? `bg-green-300 py-2 w-full` : "border-2 py-2 w-full"}
                     onClick={() => handleAttendanceClick(student,index, "present")}
                     />
              </div>
              {
                
                  (getAttendanceForToday(student.attendance) && enable == false) && (
                    <div className='absolute z-20 left-0 bottom-0 w-full h-3/4 bg-black/60 flex items-center justify-center text-white text-xl'>
                      <p className='text-white z-30'>Marked</p>
                    </div>
                  )
                }
              {
                open && (
                  <>
            
                  <Modal currStudent={currStudent} closeModal={closeModal}/>
                  </>
                )
              }
            </div>
            
            )
          })
        }
      </div>
      <div className='flex justify-center'>
        <button type='button' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mt-5 w-[95%]' onClick={submitAttendance}>Submit</button>
      </div>


      
    </div>

    
  )
};

export default Attendance;
