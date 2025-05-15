import React from 'react'

const Tabs = ({tabSelected, setTabSelected}) => {
  return (
   // Tabs
   <div
   className={`grid grid-cols-2 gap-4 mb-4 bg-gray-50  ${
     tabSelected === "PI" ? "" : ""
   }`}
 >
   {/* tab 1 */}
   <button
     className={`${
       tabSelected === "PI" && "bg-indigo-100 p-2 text-indigo-600"
     }`}
     onClick={() => setTabSelected("PI")}
   >
     Personal Information
   </button>
   {/* tab 2 */}
   <button
     className={`${
       tabSelected === "Fees Management" &&
       "bg-indigo-100 p-2 text-indigo-600"
     }`}
     onClick={() => setTabSelected("Fees Management")}
   >
     Fees Management
   </button>
 </div>
  )
}

export default Tabs