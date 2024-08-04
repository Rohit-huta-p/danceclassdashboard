
import { useDispatch, useSelector } from 'react-redux'
import { GiHamburgerMenu } from "react-icons/gi";


const Navbar = ({sidebarOpen, setsidebarOpen}) => {
    
  return (
    <>

      {/* MEDIUM SCREEN */}
      <div className='hidden md:block'>
        <div className='bg-blue-500 h-[4rem] flex justify-between items-center'>
          <ul>
            <li>some </li>
            <li>some </li>
            <li>some </li>
          </ul>
        </div>
      </div>

    {/* MOBILE SCREEN */}
    <div className='md:hidden'>
      <div className='bg-blue-500 h-[4rem] flex justify-between items-center'>
        <GiHamburgerMenu className='' size={25} color='white' onClick={() => setsidebarOpen(true)}/>
      </div>
       
    </div>
  </>
  )
}

export default Navbar