import React, { useState } from "react";
import Tabs from "./components/Tabs.jsx";
import Personal_Info_Tab from "./components/Personal_Info_tab.jsx";
import Fees_Management_tab from "./components/Fees_Management_tab.jsx";
const Update_Modal_Mob = ({student, handleInputChange, handleFileChange, batches, formData}) => {

  
  
    const [tabSelected, setTabSelected] = useState("PI");
  return (
    <>
    <Tabs tabSelected={tabSelected} setTabSelected={setTabSelected}/>
    {
      tabSelected === "PI" && (
        <Personal_Info_Tab student={student} formData={formData} handleInputChange={handleInputChange} handleFileChange={handleFileChange} batches={batches}/>
      )
    }
  
    {
      tabSelected === "Fees Management" && (
        <Fees_Management_tab student={student} formData={formData} handleInputChange={handleInputChange} handleFileChange={handleFileChange} batches={batches}/>
      )
    }
  
  </>
  )
};

export default Update_Modal_Mob;
