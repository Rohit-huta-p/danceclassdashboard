
import { useDispatch, useSelector } from 'react-redux'
import { GiHamburgerMenu } from "react-icons/gi";
import { logout, reset } from '../slices/userSlice';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';


const Navbar = ({sidebarOpen, setsidebarOpen}) => {
  const [clicked, setclicked] = useState('')
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

      {/* MEDIUM SCREEN */}
      <div className='hidden md:block'>
        <div className={`bg-blue-500 h-[4rem] ${isLogin ? "flex justify-between items-center": "flex justify-end"}`}>
          {
            isLogin && <ul className='flex items-center justify-end w-full'>
                <li className='mr-5'>
                      <Link to='/'>
                              <li className={`px-2 relative `} onClick={() => setclicked('home')}>
                                  <div className='w-[5px] h-full top-0 left-0 rounded-e bg-blue-500 absolute'></div>
                                  <p className={`ml-3 ${clicked === 'home' ? 'bg-blue-400 px-2   text-white' : 'text-white' }`}>Home</p>
                              </li>
                      </Link> 
                    </li>
                  <li className='mr-5'>
                      <Link to='/attendance'>
                              <li className={`px-2 relative `} onClick={() => setclicked('attendance')}>
                                  <div className='w-[5px] h-full top-0 left-0 rounded-e bg-blue-500 absolute'></div>
                                  <p className={`ml-3 ${clicked === 'attendance' ? 'bg-blue-400 px-2   text-white' : 'text-white' }`}>Attendance</p>
                              </li>
                      </Link> 
                    </li>
                  
                  
                </ul>
          }
          {isLogin ? (          
                <button className='bg-white px-3 py-2 h-fit rounded mr-4' onClick={handleLogout}>Logout</button>
          ) : (
            <div className='flex justify-end items-center'>
              <Link to={currentPath === '/login' ? '/signup' : '/login'}>
                <button className='bg-white px-3 py-2 rounded mr-4'>
                  {currentPath === '/login' ? 'Signup' : 'Login'}
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

    {/* MOBILE SCREEN */}
    <div className='md:hidden'>
     
      <div className='bg-blue-500 h-[4rem] flex justify-end items-center '>

        {/* LOGIN LOGOUT BUTTONS */}
        <div className=''>
          {isLogin == false && 
                <Link to={currentPath === '/login' ? '/signup' : '/login'}>
                  <button className='bg-white px-3 py-2 rounded mr-4'>
                    {currentPath === '/login' ? 'Signup' : 'Login'}
                  </button>
                </Link>
            }
          </div>
        {isLogin && 
          <GiHamburgerMenu className='mr-4' size={25} color='white' onClick={() => setsidebarOpen(true)}/>
        }
      </div>
    </div>
  </>
  )
}

export default Navbar