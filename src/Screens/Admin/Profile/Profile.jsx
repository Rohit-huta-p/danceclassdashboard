import React, { useState } from "react";
import { useSelector } from "react-redux";
import Batches from "./components/Batches/Batches";
import Sidebar from "../../../components/Sidebar";
import FeesManagement from "./components/FeesManagement/FeesManagement";

const Profile = () => {
  const options = ["Profile", "Class edits"];
  const [selected, setSelected] = useState("Profile");
  const [tabSelected, setTabSelected] = useState("Fees_Management");
  const [collapsed, setCollapsed] = useState(false);  
  const { user } = useSelector((state) => state.user);
  console.log(user);
 
  return (
    <div className="">

    <div className="grid grid-cols-1 md:grid-cols-5 mt-16">
      <div className="fixed left-0 col-span-1 md:col-span-1 ">
        <Sidebar tabSelected={tabSelected} setTabSelected={setTabSelected} 
        collapsed={collapsed} setCollapsed={setCollapsed}/> 
      </div>
      { 
        tabSelected === "Fees_Management" && (
          <div className="ml-16 max-h-screen col-span-4 md:col-span-4">
            <FeesManagement />
          </div>
        ) 
      }
      {
        tabSelected === "Batches" && (
          <div className="p-2 ml-16 max-h-screen col-span-4 md:col-span-4">
            <Batches />
          </div>
        ) 
      }


    </div>
  

    
    </div>
  );
};

export default Profile;
