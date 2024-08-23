import axios from 'axios';
import React, { useContext, useState } from 'react'
import { IoCloseCircleSharp } from "react-icons/io5";
import axiosInstance from '../../axiosInstance';
import '@dotlottie/player-component';
import { GlobalContext } from '../../contexts/GlobalContexts';
const AddStudent = ({setIsAdd, addStudentToList}) => {

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const {batches} = useContext(GlobalContext);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        contact: '',
        dateOfJoining: '',
        batch: '6:00pm - 7:00pm',
        balance: '',
        image: null,
        fees: '',
        feesPaid: '',
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
          balance: '',
          image: null,
          fees: '',
          feesPaid: '',
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
        uploadData.append('fees', formData.fees);
        uploadData.append('feesPaid', formData.feesPaid);
        if(formData.image){
          uploadData.append('image', formData.image);
        }
        
        try {
          setLoading(true);
          console.log("UPLOADED DATA", typeof uploadData.balance);
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
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
          <div className="bg-white w-10/12 md:8/12 rounded-lg shadow-lg p-5 relative max-h-[90vh]">
            <button
              onClick={() => setIsAdd(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              X
            </button>
            <h2 className="text-lg font-semibold mb-4">
              Add Student
            </h2>
            <div className={`flex justify-center max-h-[75vh] overflow-y-auto`} >
                <form action="" className=' flex-col w-9/12 h-content space-y-4 ' onSubmit={handleForm}>
                    {/* _________________________________ */}
                    <div class="relative ">
                        <input type="name" id="hs-floating-input-name" class="peer p-4 block w-full  rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none 
                        bg-gray-100
                        focus:pt-6
                        focus:pb-2
                        autofill:pt-6
                        autofill:pb-2" placeholder="NAme" 
                        name='name' value={formData.name} onChange={handleInputChange}/>
                        <label for="hs-floating-input-name" class="
                          absolute top-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100  origin-[0_0] 
                          peer-focus:scale-90
                          peer-focus:translate-x-0.5
                          peer-focus:-translate-y-1.5
                          peer-focus:text-gray-500 
                          peer-[:not(:placeholder-shown)]:scale-90
                          peer-[:not(:placeholder-shown)]:translate-x-0.5
                          peer-[:not(:placeholder-shown)]:-translate-y-1.5
                          peer-[:not(:placeholder-shown)]:text-gray-500 
                          dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">Name</label>
                      </div>
                      {/* age */}
                    <div class="relative ">
                        <input type="age" id="hs-floating-input-age" class="peer p-4 block w-full rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none 
                        bg-gray-100
                        focus:pt-6
                        focus:pb-2
                        autofill:pt-6
                        autofill:pb-2" placeholder="you@age.com"
                        name='age' value={formData.age} onChange={handleInputChange} />
                        <label for="hs-floating-input-age" class="
                          absolute top-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] 
                          peer-focus:scale-90
                          peer-focus:translate-x-0.5
                          peer-focus:-translate-y-1.5
                          peer-focus:text-gray-500 
                          peer-[:not(:placeholder-shown)]:scale-90
                          peer-[:not(:placeholder-shown)]:translate-x-0.5
                          peer-[:not(:placeholder-shown)]:-translate-y-1.5
                          peer-[:not(:placeholder-shown)]:text-gray-500 
                          dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">Age</label>
                      </div>
                      {/* Contact */}
                    <div class="relative ">
                        <input type="contact" id="hs-floating-input-contact" class="peer p-4 block w-full rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none 
                        bg-gray-100
                        focus:pt-6
                        focus:pb-2
                        autofill:pt-6
                        autofill:pb-2" placeholder="you@contact.com"
                        name='contact' value={formData.contact} onChange={handleInputChange} />
                        <label for="hs-floating-input-contact" class="
                          absolute top-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] 
                          peer-focus:scale-90
                          peer-focus:translate-x-0.5
                          peer-focus:-translate-y-1.5
                          peer-focus:text-gray-500 
                          peer-[:not(:placeholder-shown)]:scale-90
                          peer-[:not(:placeholder-shown)]:translate-x-0.5
                          peer-[:not(:placeholder-shown)]:-translate-y-1.5
                          peer-[:not(:placeholder-shown)]:text-gray-500 
                          dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">Contact</label>
                      </div>

                      {/* Batch */}
                      <div class="relative">
                        <select class="peer p-4 pe-9 block w-full  rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none 
                        bg-gray-100
                        focus:pt-6
                        focus:pb-2
                        [&:not(:placeholder-shown)]:pt-6
                        [&:not(:placeholder-shown)]:pb-2
                        autofill:pt-6
                        autofill:pb-2"
                        name='batch' value={formData.batch} onChange={handleInputChange}
                        >
                          <option selected="">Open this select menu</option>
                          {Object.entries(batches).map(([key, value]) => (
                            <option key={key} value={value}>
                              {`${key} - ${value}`}
                            </option>
                          ))}
                        </select>
                        <label class="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                          peer-focus:text-xs
                          peer-focus:-translate-y-1.5
                          peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
                          peer-[:not(:placeholder-shown)]:text-xs
                          peer-[:not(:placeholder-shown)]:-translate-y-1.5
                          peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">Batch</label>
                      </div>
                    {/* FEES */}
                    <div class="relative ">
                        <input type="fees" id="hs-floating-input-fees" class="peer p-4 block w-full rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none 
                        bg-gray-100
                        focus:pt-6
                        focus:pb-2
                        autofill:pt-6
                        autofill:pb-2" placeholder="you@fees.com"
                        name='fees' value={formData.fees} onChange={handleInputChange}
                        />
                        <label for="hs-floating-input-fees" class="
                          absolute top-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] 
                          peer-focus:scale-90
                          peer-focus:translate-x-0.5
                          peer-focus:-translate-y-1.5
                          peer-focus:text-gray-500 
                          peer-[:not(:placeholder-shown)]:scale-90
                          peer-[:not(:placeholder-shown)]:translate-x-0.5
                          peer-[:not(:placeholder-shown)]:-translate-y-1.5
                          peer-[:not(:placeholder-shown)]:text-gray-500 
                          dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">Fees</label>
                      </div>

                      {/* Fees paid */}
                    <div class="relative">
                        <input type="feesPaid" id="hs-floating-input-feesPaid" class="peer p-4 block w-full rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none 
                        bg-gray-100
                        focus:pt-6
                        focus:pb-2
                        autofill:pt-6
                        autofill:pb-2" placeholder="you@feesPaid.com"
                        name='feesPaid' value={formData.feesPaid} onChange={handleInputChange} />
                        <label for="hs-floating-input-feesPaid" class="
                          absolute top-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] 
                          peer-focus:scale-90
                          peer-focus:translate-x-0.5
                          peer-focus:-translate-y-1.5
                          peer-focus:text-gray-500 
                          peer-[:not(:placeholder-shown)]:scale-90
                          peer-[:not(:placeholder-shown)]:translate-x-0.5
                          peer-[:not(:placeholder-shown)]:-translate-y-1.5
                          peer-[:not(:placeholder-shown)]:text-gray-500 
                          dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">Fees Paid</label>
                      </div>

      {/* _________________________________ */}
                    {/* File */}
                    <div className='bg-gray-100 p-2 rounded'>
                      <label htmlFor="" className='text-sm text-gray-500 scale-90'>Student's Pic</label>
                      <input type="file" className="block w-full text-sm text-gray-500
                          file:me-4 file:py-2 
                          file:rounded-lg file:border-0
                          file:text-sm file:font-semibold
                          file:bg-slate-500 file:text-white
                      " 
                      name="image" onChange={handleFileChange}
                      />
                    </div>
                    {/* DOJ */}
                    <div className='flex-col bg-gray-100 p-2 rounded'>
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

        
    </div>
  )
}

export default AddStudent