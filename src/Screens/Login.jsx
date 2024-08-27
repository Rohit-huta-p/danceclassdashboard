import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, reset } from '../slices/userSlice';
import { Link } from 'react-router-dom';
import { FaCircleInfo } from "react-icons/fa6";

import Loader from '../components/Loader';
import formError from '../components/FormError';
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const data = {email, password};
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const {loading, error} = useSelector( (state) => state.user);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setErrors(formError(data));

            const login_data = {email, password};
            dispatch(loginUser(login_data));
            
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        dispatch(reset());
    }, [])

    const getErrorMessage = (field) => {
        if (errors.includes(field)) {
            return (
                <div className='flex items-center'>
                    <FaCircleInfo size={13} color='red' className='mr-1'/>
                    <p className='text-sm text-red-500'>Please enter {field}</p>
                </div>
        );
        }
        return null;
    };
    
  return (
    <div className='h-screen'>
    <div className='flex justify-center items-center h-full'>
        {/* card */}
        <div className='relative shadow-inner shadow-xl bg-white w-4/6 md:w-3/6 py-[4rem] px-4 flex flex-col items-center justify-center rounded md:rounded-[4%]'>  

            <h1 className='text-3xl p-4'>
               Login
            </h1>

            {/* form */}
            <form onSubmit={ handleLogin } className='w-full flex flex-col items-center'>
                <div className='px-1 w-9/12'>
                
                    <div>
             
                        <input type="email" placeholder='Email' className='w-full p-3 bg-transparent focus:outline-none transition-all '
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                        />
                        <hr />
                        {getErrorMessage('email')}
                    </div>
                    <div>
           
                        <input type="password" placeholder='Password' className='w-full p-3 bg-transparent focus:outline-none' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value) }/>
                        <hr />
                        {getErrorMessage('password')}
                    </div>
                </div>
                <button className='bg-blue-700 text-white px-3 py-2 rounded mt-4 w-9/12'>
                    Login
                </button>
            </form>
           <Loader loading={loading}/>

            {error && <p className='text-sm text-center mt-2' style={{ color: 'red' }}>{error}</p>}


            <div className='flex justify-start w-9/12 mt-2'>
                <p className=''>
                    Don't have an account?
                    <Link to='/signup' className='text-blue-700'> Register</Link>
                </p>
                
            </div>
        </div>
    </div>
</div>
  )
}

export default Login