import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { fetchUserDetails } from '../slices/userSlice';
import AddStudent from './Admin/AddStudent';
import axios from 'axios';
import AllStudents from './Admin/AllStudents';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import DashBoard from './Admin/DashBoard';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonAllStudents from './Admin/SkeletonAllStudents';


const Admin = () => {
  const dispatch = useDispatch();
  const {user, status, error, message, loading} = useSelector((state) => state.user)
  console.log(user);
  
  const [isAdd, setIsAdd] = useState(false)

  const [students, setStudents] = useState([]);
  
  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(`/api/admin/students`);
      setStudents(res.data.students);
      // Handle success, redirect or show a message
    } catch (err) {
      console.error('Upload error:', err);
      // Handle error, show error message
    }
  }
  useEffect(() => {
    dispatch(fetchUserDetails());
    fetchData();
  
  }, [])
  
  const addStudentToList = (newStudent) => {
    setStudents((prevStudents) => {
      if (Array.isArray(prevStudents)) {
        return [...prevStudents, newStudent];
      } else {
        // Handle the case where prevStudents is not an array
        return [newStudent];
      }
    })
  };

  return (
    <>
       

    <div className=''>
        {
          user && (
              <h1 className='text-3xl mt-2 ml-4 mb-3'>Welcome {user.username}</h1>
              )
        }


      
       {/* { 
          user && (
            user.isAdmin && ( */}
              <DashBoard />
            {/* )
          )
        } */}

      <div className='mt-5 p-2'>
        <button className='bg-blue-200 px-3 py-2 rounded active:bg-blue-100' onClick={() => setIsAdd(true)}>Add Student</button>
      </div>
        {
          isAdd && (
              <div className=''>
                <AddStudent setIsAdd={setIsAdd} addStudentToList={addStudentToList}/>
              </div>
              )
        }

<SkeletonAllStudents />
  
        {
            students && students.length > 0 ? (
              <AllStudents students={students} setStudents={setStudents} />
            ) : (
              <p className="text-center text-orange-400 w-full text-2xl">
                No Students
              </p>
            )
        }
    </div>
    </>
  )
}

export default Admin