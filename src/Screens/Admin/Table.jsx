// import React from 'react'

// const Table = () => {
//   return (
//     <table className="bg-white rounded-[2rem] p-2 overflow-hidden min-w-full divide-y divide-gray-200   dark:divide-neutral-700">
//     <thead>
//         <tr>
//             <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Name</th>
//             <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Age</th>
//             <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Contact</th>
//             <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Batch</th>
//             <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Fee Status</th>
//             <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Date Of Joining</th>
//             <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Actions</th>
//         </tr>
//     </thead>
//     <tbody className="divide-y font-thin divide-gray-200 dark:divide-neutral-700">
//     {/* STUDENT DATA */}
//     {
//     getFilteredStudents.map(student => (
//         <tr key={student._id}>

//             <td className="flex items-center px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
//                 <div className='h-[3rem] w-[3rem] rounded-full mr-3' style={{ backgroundImage: `url(${student.Image})`, backgroundSize: 'cover' }}></div>
//                 <p className='font-thin'> {student.name}</p>
         
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{student.age}</td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"><a href={`tel:${student.contact}`}>{student.contact}</a></td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">{student.batch}</td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
//                 {/* pending */}
//                 {student.feeStatus === 'pending' ? (
//                     <div className='flex items-center '>
//                         <p className='text-amber-600 animate-pulse'>• Pending </p> 
//                         <a onClick={() => downloadFeeHistory(student._id, student)}><CiCircleInfo size={16} color='blue' className='ml-2'/></a>                                                </div>  
//                 ) : 
//                 // done
//                 (
//                     <div className='flex items-center '>
//                         <p className='bg-green-200 py-1 px-4 rounded'>Paid </p> 
//                         <a onClick={() => downloadFeeHistory(student._id, student)}><CiCircleInfo size={16} color='blue' className='ml-2'/></a>
//                     </div>  
//                 )}
    
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
//                 {new Date(student.dateOfJoining).toLocaleDateString('en-US', {
//                     year: 'numeric',
//                     month: 'short',
//                     day: 'numeric',
//                 })}
//             </td>
//             <td className="flex-col px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
//                 <button type="button" className="mr-3 inline text-sm font-semibold rounded-lg text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400"
//                     onClick={() => openUpdateModal(student)}
//                 >
//                     Update
//                 </button>
//                 <button type="button" className="inline text-sm font-semibold rounded-lg  text-red-600 hover:text-red-800 disabled:opacity-50"
//                     onClick={() => deleteStudent(student._id)}
//                 >
//                     Delete
//                 </button>
//             </td>
//         </tr>

        
//         ))
//     }
//         </tbody>
//     </table>
//   )
// }

// export default Table