import React from 'react'
import Personal_Info_Tab from './Personal_Info_tab'
import Fees_Management_tab from './Fees_Management_tab'

const Update_Modal_Desktop = ({student, formData, handleInputChange, handleFileChange, batches}) => {
    console.log(student);
    
  return (
    <>

         <Personal_Info_Tab student={student} formData={formData} handleInputChange={handleInputChange} handleFileChange={handleFileChange} batches={batches}/>
         <Fees_Management_tab student={student} formData={formData} handleInputChange={handleInputChange} />

    </>
  )
}

export default Update_Modal_Desktop