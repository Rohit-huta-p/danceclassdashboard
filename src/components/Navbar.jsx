
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../slices/userSlice';
import { Link } from 'react-router-dom';


const Navbar = () => {
  
    const dispatch = useDispatch();
    const {isLogin} = useSelector((state) => state.user);
    const handleLogout = async () => {
        dispatch(logout());
        dispatch(reset());
    }

    

    
  return (
    <div className='bg-blue-500 h-[4rem] flex justify-end items-center overflow-hidden'>
        <div  onClick={isLogin ? handleLogout: null }>
          {isLogin ? 
              <button className='bg-white px-3 py-2 rounded mr-4'>Logout</button> 
              : 
              <Link to='/login'> <button className='bg-white px-3 py-2 rounded mr-4'>Login </button></Link>
                }
        </div>
    </div>
  )
}

export default Navbar