import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../slices/userSlice';
import { Link } from 'react-router-dom';

const Sidebar = ({sidebarOpen, setsidebarOpen}) => {

    const [clicked, setclicked] = useState('')


    const dispatch = useDispatch();
    const {isLogin} = useSelector((state) => state.user);
    const handleLogout = async () => {
        dispatch(logout());
        dispatch(reset());
    }

         
      
  

  return (
    <div className=''>
        {
            sidebarOpen &&
                <div className={`z-20 fixed rounded-e-2xl h-screen top-0 bg-white w-6/12 md:w-1/4 ${sidebarOpen ? 'animate-sidebarOpen' : 'animate-sidebarClose'}`}>
                    <p className='text-end p-4' onClick={() => setsidebarOpen(false)}>X</p>
                    <ul className='flex flex-col h-[60vh]'>
                        <Link to='/attendance'>
                            <li className={`mb-4 mt-5 px-2 py-2 relative ${clicked === 'attendance' ?'bg-blue-200' :'' }`} onClick={() => setclicked('attendance')}>
                                <div className='w-[5px] h-full top-0 left-0 rounded-e bg-blue-500 absolute'></div>
                                <p className='ml-3'>Attendance</p>
                            </li>
                        </Link>
                        <li>Pending</li>
                    </ul>
                    <div  onClick={handleLogout}>
                       <button className='bg-white px-3 py-2 rounded mr-4'>Logout</button> 
                    </div>
                </div>
                
            
           
        }
    </div>
  )
}

export default Sidebar