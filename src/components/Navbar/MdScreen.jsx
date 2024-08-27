import React from 'react'
import { Link } from 'react-router-dom'

const MdScreen = ({currentPath, isLogin, handleLogout}) => {
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


      </>
  )
}

export default MdScreen