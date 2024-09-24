import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import noProfilePic from '../../assets/np-profile-pic.png'
import { useState } from 'react'
const MdScreen = ({currentPath, isLogin, handleLogout}) => {
  const [profileClicked, setprofileClicked] = useState(false)

   // Only update state when the path changes
   useEffect(() => {
    window.location.pathname === '/profile' && setprofileClicked(false);
    
  }, [window.location.pathname]);
  
  return (
      <>
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

          {/* LOGOUT */}
          {isLogin ? (          
              <div className='relative'>
                <button
                className="h-10 w-10 rounded-full bg-no-repeat bg-cover overflow-hidden"
                style={{
                  backgroundImage: `url(${noProfilePic})`,
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setprofileClicked(!profileClicked)}
                }
                >
                  
              </button>
              {
                profileClicked && (
                  <ul className='absolute right-0 bg-slate-800 text-white rounded '>
                    <div className='px-6 w-full cursor-pointer py-1 hover:bg-slate-700 '>
                      <Link to='/profile'>Profile</Link>
                    </div>
                    <div className='w-full h-0.5 bg-gray-500 absolute left-0'></div>
                    <div className='px-6 w-full cursor-pointer py-1 hover:bg-slate-700 '>
                      <li className=''>
                        <button className='' onClick={handleLogout}>Logout</button>
                      </li>
                    </div>
                  </ul>
                )
              }
             
              </div>
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


      </>
  )
}

export default MdScreen