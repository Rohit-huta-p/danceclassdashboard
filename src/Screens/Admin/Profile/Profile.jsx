import React, { useState } from "react";
import { useSelector } from "react-redux";
import Batches from "./components/Batches/Batches";
import Sidebar from "../../../components/Sidebar";
import FeesManagement from "./components/FeesManagement/FeesManagement";

const Profile = () => {
  const options = ["Profile", "Class edits"];
  const [selected, setSelected] = useState("Profile");
  const [tabSelected, setTabSelected] = useState("Fees_Management");
  const { user } = useSelector((state) => state.user);
  console.log(user);
 
  return (
    <div className="">

    <div className="grid grid-cols-1 md:grid-cols-5">
      <div className="col-span-1 md:col-span-1 ">
        <Sidebar tabSelected={tabSelected} setTabSelected={setTabSelected}/> 
      </div>
      { 
        tabSelected === "Fees_Management" && (
          <div className="col-span-4 md:col-span-4">
            <FeesManagement />
          </div>
        ) 
      }
      {
        tabSelected === "Batches" && (
          <div className="col-span-4">
            <Batches />
          </div>
        ) 
      }


    </div>
  

    
    </div>
  );
};

export default Profile;
