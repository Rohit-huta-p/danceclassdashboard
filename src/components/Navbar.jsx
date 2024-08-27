
import { useDispatch, useSelector } from 'react-redux'

import { logout, reset } from '../slices/userSlice';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import icon from '../assets/icon.png'
import MdScreen from './Navbar/MdScreen';
import SmScreen from './Navbar/SmScreen';

const Navbar = ({sidebarOpen, setsidebarOpen}) => {

const [currentPath, setcurrentPath] = useState(window.location.pathname)
  const dispatch = useDispatch();
  const {isLogin} = useSelector((state) => state.user);
  const handleLogout = async () => {
      dispatch(logout());
      dispatch(reset());
  }
  const location = useLocation();

  useEffect(() => {
    setcurrentPath(location.pathname);
  }, [location]);
  return (
    <>
  <nav className='bg-blue-800 h-[4rem] flex justify-between items-center px-2 z-10 w-full'>
      <div className='flex items-center'>
        <img src={icon} alt="" className='w-12'/>
        <h1 className='text-white text-xl'>Studio Flowie</h1>
      </div>
    <div>
      <MdScreen currentPath={currentPath} isLogin={isLogin} handleLogout={handleLogout}/>
      <SmScreen currentPath={currentPath} isLogin={isLogin} handleLogout={handleLogout} setsidebarOpen={setsidebarOpen}/>


  </div>
  </nav>
  </>
  )
}

export default Navbar