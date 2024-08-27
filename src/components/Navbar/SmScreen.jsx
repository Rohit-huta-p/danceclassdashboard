import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';
const SmScreen = ({isLogin, setsidebarOpen, currentPath}) => {
  return (
    <div>
        
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
  )
}

export default SmScreen