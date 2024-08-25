
import { useDispatch, useSelector } from 'react-redux'
import { GiHamburgerMenu } from "react-icons/gi";
import { logout, reset } from '../slices/userSlice';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import icon from '../assets/icon.png'

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
      {/* MEDIUM SCREEN */}
      <div className='hidden md:block'>
        <div className={` ${isLogin ? "flex justify-between items-center": "flex justify-end"}`}>
          {
            isLogin && <ul className='flex items-center justify-end w-full'>
                <li className='mr-5'>
                      <Link to='/'>
                              <li className={`px-2 relative `} >
                                  {currentPath === '/' && <div className='w-[90%] h-0.5 bottom-[-5px] l rounded-e bg-slate-300 absolute'></div>}
                                  <p className={`ml-3 ${currentPath === '/' ? 'text-white' : 'text-white' }`}>Home</p>
                              </li>
                      </Link> 
                    </li>
                  <li className='mr-5'>
                      <Link to='/attendance'>
                              <li className={`px-2 relative `} >
                              {currentPath === '/attendance' && <div className='w-[90%] h-0.5 bottom-[-5px] l rounded-e bg-slate-300 absolute'></div>}
                              <p className={`ml-3 ${currentPath === '/attendance' ? 'text-white' : 'text-white' }`}>Attendance</p>
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
     
      <div className=''>

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
  </div>
  </nav>
  </>
  )
}

export default Navbar