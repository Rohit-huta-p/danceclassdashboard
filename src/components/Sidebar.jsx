import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../slices/userSlice';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({sidebarOpen, setsidebarOpen}) => {

    const [currentPath, setcurrentPath] = useState(window.location.pathname)
    const [clicked, setclicked] = useState('')


    const dispatch = useDispatch();
    const {isLogin} = useSelector((state) => state.user);
    const handleLogout = async () => {
        dispatch(logout());
        dispatch(reset());
        setsidebarOpen(false);
    }
    const location = useLocation();
    useEffect(() => {
      
        setcurrentPath(location.pathname);
    }, [location])
    
      
  

  return (
    <div className=''>
        {
            sidebarOpen &&
                <div className={`z-20 fixed rounded-e-2xl h-screen top-0 bg-white w-5/12 md:w-1/6  ${sidebarOpen ? 'animate-sidebarOpen' : 'animate-sidebarClose'}`}>
                    <p className='text-end p-4' onClick={() => setsidebarOpen(false)}>X</p>
                    <ul className='flex flex-col h-[80vh]'>
                        {/* HOME */}
                        <li className={`px-2 py-2 relative ${currentPath === '/' ?'bg-blue-200' :'' }`} onClick={() => setclicked('home')}>
                            <Link to='/'>
                                {currentPath === '/' && <div className='w-[5px] h-full top-0 left-0 rounded-e bg-blue-500 absolute'></div>}
                                <p className='ml-3'>Home</p>
                            </Link>
                        </li>

                        {/* ATTENDANCE */}
                        <li className={`mb-4 mt-5 px-2 py-2 relative ${currentPath === '/attendance' ?'bg-blue-200' :'' }`} onClick={() => setclicked('attendance')}>
                            <Link to='/attendance'>
                                {currentPath === '/attendance' && <div className='w-[5px] h-full top-0 left-0 rounded-e bg-blue-500 absolute'></div>}
                                <p className='ml-3'>Attendance</p>
                            </Link>
                        </li>
                        
                    </ul>
                    <div  onClick={handleLogout} className='flex justify-end'>
                       <button className='bg-blue-300 ml-3 px-3 py-2 rounded mr-4'>Logout</button> 
                    </div>
                </div>
                
            
           
        }
    </div>
  )
}

export default Sidebar