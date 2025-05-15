import React from 'react'

const Personal_Info_Tab = ({student}) => {
  return (
    <>

   <div className="space-y-4 p-4 border-r-2 ">
   <h2 className="text-xl">Personal Information</h2>
   {/* Name */}
   <div>
     <label className="block text-xs font-medium text-gray-700">
       Name

     </label>
     <input
       type="text"
       value={formData.name}
       name="name"
       onChange={handleInputChange}
       className="mt-1 block w-full p-1 rounded-md outline-none  sm:text-sm"
     />
   </div>

   {/* Age */}
   <div>
     <label className="block text-xs font-medium text-gray-700">
       Age
     </label>
     <input
       type="text"
       value={formData.age}
       onChange={handleInputChange}
       name="age"
       className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
     />
   </div>
   {/* Batch */}
   <div>
     <label className="block text-xs font-medium text-gray-700">
       Batch
     </label>
     <select
       value={formData.batch}
       name="batch"
       onChange={handleInputChange}
       className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
     >
       {batches.map((batch, index) => (
         <option key={index} value={batch.batchTitle}>
           {batch.batchTitle}
         </option>
       ))}
     </select>
   </div>

   {/* porfile image */}
   <div>
     <label className="block text-xs font-medium text-gray-700">
       Profile Picture URL
     </label>
     <input
       type="file"
       value={formData.image}
       onChange={handleFileChange}
       name="image"
       className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
     />
   </div>

   {/* Contact */}
   <div>
     <label className="block text-xs font-medium text-gray-700">
       Contact
     </label>
     <input
       type="text"
       value={formData.contact}
       onChange={handleInputChange}
       name="contact"
       className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
     />
   </div>

   {/* Date of Joining */}
   <div>
     <label className="block text-xs font-medium text-gray-700">
       Date of Joining
     </label>
     <input
       type="date"
       value={formData.dateOfJoining?.split("T")[0] || ""}
       onChange={handleInputChange}
       name="date"
       className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
     />
   </div>
 </div>


 </>
  )
}

export default Personal_Info_Tab