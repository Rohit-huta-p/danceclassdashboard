import axios from 'axios';
import React, { useState } from 'react'
import { IoCloseCircleSharp } from "react-icons/io5";
import axiosInstance from '../../axiosInstance';
import '@dotlottie/player-component';
const AddStudent = ({setIsAdd, addStudentToList}) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        contact: '',
        dateOfJoining: '',
        batch: '6:00pm - 7:00pm',
        feeStatus: 'pending',
        balance: 0,
        image: null
      });
  
      // resetFormData
      const resetFormData = () => {
        setFormData({
          name: '',
        age: '',
        contact: '',
        dateOfJoining: '',
        batch: '6:00pm - 7:00pm',
        feeStatus: 'pending',
        balance: 0,
        image: null
        });
      }
      
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

    const handleForm = async (e) => {
        e.preventDefault();
        const uploadData = new FormData();
        uploadData.append('name', formData.name);
        uploadData.append('age', formData.age);
        uploadData.append('contact', formData.contact);
        uploadData.append('batch', formData.batch);
        uploadData.append('dateOfJoining', formData.dateOfJoining);
        uploadData.append('feeStatus', formData.feeStatus);
        uploadData.append('balance', formData.balance);
        if(formData.image){
          uploadData.append('image', formData.image);
        }
        
        try {
          setLoading(true);
            const res = await axiosInstance.post(`/api/admin/addstudent`, uploadData, {
              headers: { 'Content-Type': 'multipart/form-data' }
            });
            setLoading(false);
            console.log('Uploaded:', res.data);
            setMessage(res.data.message);
            addStudentToList(res.data.student)
            resetFormData();
            setTimeout(() => {
              setMessage('');
              setIsAdd(false)
            }, 5000)
          } catch (err) {
            console.error('Upload error:', err);
            // Handle error, show error message
          }

    }

  return (
    <div className='flex justify-center'>

        <div className={`p-2 w-9/12 rounded relative bg-white`}>

            <h1 className=' text-center mt-5 text-2xl font-bold mb-5'>Add Student</h1>
            <IoCloseCircleSharp size={23} className='absolute top-4 right-4 cursor-pointer text-red-400' onClick={() => setIsAdd(false)}/>
            <div className={`flex justify-center`} >
                <form action="" className=' flex-col w-9/12 h-content space-y-4' onSubmit={handleForm}>
                {/* name */}
                    <input type="text" className='border px-3 py-2 rounded w-full' placeholder='Enter Name' name='name' value={formData.name} onChange={handleInputChange} />
                {/* age */}
                    <input type="text" className='border px-3 py-2 rounded w-full' placeholder='Enter Age' name='age' value={formData.age} onChange={handleInputChange} />
                {/* contact */}
                    <input type="text" className='border px-3 py-2 rounded w-full' placeholder='Enter Contact' name='contact' value={formData.contact} onChange={handleInputChange} />
                  {/* Batch */}
                    <div className='flex items-center rounded w-full border px-3 py-2'>
                        <label htmlFor="">Batch: </label>
                        <select name="batch" value={formData.batch} onChange={handleInputChange} className='ml-3 bg-amber-100 rounded px-3 py-1'>
                            <option value="6:00pm - 7:00pm">6:00pm - 7:00pm</option>
                            <option value="7:00pm - 8:00pm">7:00pm - 8:00pm</option>
                        </select>
                    </div>              
                  {/* Fee status */}
                    <div className='flex items-center rounded w-full border px-3 py-2'>
                        <label htmlFor="">Fee Status: </label>
                        <select name="feeStatus" value={formData.feeStatus} onChange={handleInputChange} className='ml-3 bg-amber-100 rounded px-3 py-1'>
                            <option value="done">Done</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                    {/* Balance */}
                    <input type="text" className='border px-3 py-2 rounded w-full' placeholder="Enter balance remaining" name='balance'/>

                    {/* File */}
                    <input type="file" className="block w-full text-sm text-gray-500
                        file:me-4 file:py-2 
                        file:rounded-lg file:border-0
                        file:text-sm file:font-semibold
                        file:bg-slate-500 file:text-white
                    " 
                    name="image" onChange={handleFileChange}
                    />
                    {/* DOJ */}
                    <div className='flex-col'>
                        <label htmlFor="" className='block mb-2'>Date Of Joining: </label>
                        <input type="date" className='border px-3 py-2'  name='dateOfJoining' value={formData.dateOfJoining} onChange={handleInputChange}/>
                    </div>

                    <div className='flex-col items-center'>
                        <button className={`w-full bg-blue-500 text-white px-6 py-2 rounded ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
                          {loading ? 'Adding...' : 'Add'}
                        </button>
                        {message && (
                           <div className='absolute inset-0 flex items-center justify-center bg-green-200 bg-opacity-30'>
                           <div className='bg-white p-5 rounded-lg shadow-lg text-center'>
                              <dotlottie-player
                                src="https://lottie.host/51a54f3f-ac0f-47ad-afd3-fef6757602e3/tssFSkaMXs.json"
                                background="transparent"
                                speed="1"
                                style={{ width: '100px', height: '100px' }}
                                autoplay
                              ></dotlottie-player>
                              <p className='text-green-600 mt-3'>{message}</p>
                              <p className='text-gray-400 text-sm'>(added to table)</p>
                           </div>
                         </div>
                        )}
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddStudent