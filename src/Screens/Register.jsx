import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, reset } from '../slices/userSlice';
import { Link } from 'react-router-dom';



const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const dispatch = useDispatch();
    const {loading, error, message} = useSelector( (state) => state.user);


    const handleRegister = (e) => {
        e.preventDefault();
        try {
            const register_data = {name, email, password};
            dispatch(registerUser(register_data));
           
        } catch (e) {
            console.log(error);
            
        }
    }
 
    useEffect(() => {
      dispatch(reset())
    
     
    }, [])
    
   

    return (
        <div className='h-screen'>
            <div className='flex justify-center items-center h-full'>
                {/* card */}
                <div className='shadow-inner shadow-xl bg-white w-3/4 md:w-2/6 py-[2rem] flex flex-col items-center justify-center rounded-[8%]'>  

                    <h1 className='text-3xl p-4'>
                       Register
                    </h1>

                    {/* form */}
                    <form onSubmit={ (e) => handleRegister(e) } className='w-full flex flex-col items-center'>
                        <div className='p-4 w-10/12'>
                           <div className=''>
                                <input type="text" placeholder='Name' className='w-full p-2 bg-transparent focus:outline-none' 
                                 value={name}
                                 onChange={(e) => setName(e.target.value)}/>
                                <hr />
                            </div>
                        
                            <div>
                                <input type="email" placeholder='Email' className='w-full p-2 bg-transparent focus:outline-none'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} 
                                />
                                <hr />
                            </div>
                            <div>
                                <input type="password" placeholder='New Password' className=' w-full p-2 bg-transparent focus:outline-none' 
                                value={password}
                                onChange={(e) => setPassword(e.target.value) }/>
                                <hr />
                            </div>
                        </div>
                        <button className='bg-blue-700 text-white px-3 py-2 rounded mt-4 w-9/12'>
                            Register
                        </button>
                    </form>

                    {loading && <p>Loading...</p>}
                    {error && <p className='text-sm' style={{ color: 'red' }}>Registration failed: {error}</p>}
                    {message && <p className='text-sm' style={{ color: 'green' }}>Sucessful: {message}</p>}


                    <div className='flex justify-start w-9/12 mt-2'>
                        <p className=''>
                         Already registered?
                        <button className='text-blue-900'>
                            <Link to='/login'>Login Here</Link>    
                        </button>
                        </p>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register