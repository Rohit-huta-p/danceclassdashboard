import React, { useState } from "react";
import { useSelector } from "react-redux";
import Batches from "./components/Batches/Batches";
import Sidebar from "../../../components/Sidebar";
import FeesManagement from "./components/FeesManagement/FeesManagement";
import FeeReceipt from "./components/FeesManagement/FeeReceipt";
import UploadVideos from "./components/UploadVideos/UploadVideos";
import PaymentForm from "./components/Payment/PaymentForm";

const Profile = () => {
  const options = ["Profile", "Class edits"];
  const [selected, setSelected] = useState("Profile");
  const [tabSelected, setTabSelected] = useState("Fees_Management");
  const [collapsed, setCollapsed] = useState(false);  
  const { user } = useSelector((state) => state.user);
  console.log(user);
 
  return (
    <div className="">
      {/* <FeeReceipt /> */}
    <div className="grid grid-cols-12 md:grid-cols-5 mt-16">
      <div className="col-span-1"></div>
      <div className="fixed left-0 top-14 bottom-0 md:col-span-1 ">
        <Sidebar tabSelected={tabSelected} setTabSelected={setTabSelected} 
        collapsed={collapsed} setCollapsed={setCollapsed}/> 
      </div>
      { 
        tabSelected === "Fees_Management" && (
          <div className="md:ml-24 lg:ml-6 max-h-screen col-span-11 md:col-span-4">
            <FeesManagement />
          </div>
        ) 
      }
      {
        tabSelected === "Batches" && (
          <div className="px-8 md:p-0  md:ml-24 lg:ml-6 max-h-screen col-span-11 md:col-span-4">
            <Batches />
          </div>
        ) 
      }
      {
        tabSelected === "UploadVideos" && (
          <div className="px-8 md:p-0  md:ml-24 lg:ml-6 max-h-screen col-span-11 md:col-span-4">
            <UploadVideos />
          </div>
        ) 
      }
      {
        tabSelected === "Payment" && (
          <div className="px-8 md:p-0  md:ml-24 lg:ml-6 max-h-screen col-span-11 md:col-span-4">
            <PaymentForm />
          </div>
        ) 
      }


    </div>
  

    
    </div>
  );
};

export default Profile;
