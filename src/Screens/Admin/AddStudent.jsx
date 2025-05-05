import axios from "axios";
import React, { useContext, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import axiosInstance from "../../axiosInstance";

import { FaRegWindowClose } from "react-icons/fa";
import { GlobalContext } from "../../contexts/GlobalContexts";
import {
  DateInput,
  FileInput,
  InputField,
  LoadingIndicator,
  SelectBatchField,
  SelectField,
  SuccessMessage,
} from "./Helper";
const AddStudent = ({ setIsAdd, addStudentToList }) => {

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { batches } = useContext(GlobalContext);

  console.log(batches);
  
  // FORM DATA
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    contact: "",
    dateOfJoining: "",
    batch: "6:00pm - 7:00pm",
    balance: "",
    image: null,
    fees: "Please select the batch",
    feesPaid: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
      console.log(batches);
      
    // If batch is selected, find corresponding fees
    if (name === "batch") {

      
      const selectedBatch = batches.find((batch) => batch.batchTitle === value);

      console.log(selectedBatch);
      if(selectedBatch == undefined){
        setFormData((prevFormData) => ({
          ...prevFormData,
          batch: "Select batch",
          fees: 'Please select the batch',
        }));
      }
      else if (selectedBatch) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          batch: value,
          fees: selectedBatch.fees,
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };
 
// SUBMIT ADD STUDENT FORM
  const submitAddStudent = async (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("name", formData.name);
    uploadData.append("age", formData.age);
    uploadData.append("contact", formData.contact);
    uploadData.append("batch", formData.batch);
    uploadData.append("dateOfJoining", formData.dateOfJoining);
    uploadData.append("feeStatus", formData.feeStatus);
    uploadData.append("balance", formData.balance);
    uploadData.append("fees", formData.fees);
    uploadData.append("feesPaid", formData.feesPaid);
    if (formData.image) {
      uploadData.append("image", formData.image);
    }
    console.log("Upload Data",uploadData);
    
    try {
      setLoading(true);
      const res = await axiosInstance.post(
        `/api/admin/addstudent`,
        uploadData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setLoading(false);
      setMessage(res.data.message);
      addStudentToList(res.data.student);
      resetFormData();
      setTimeout(() => {
        setMessage("");
        setIsAdd(false);
      }, 1000);
    } catch (err) {
      console.error("Upload error:", err);
      // Handle error, show error message
    }
  };

   // resetFormData
   const resetFormData = () => {
    setFormData({
      name: "",
      age: "",
      contact: "",
      dateOfJoining: "",
      batch: "6:00pm - 7:00pm",
      feeStatus: "pending",
      balance: "",
      image: null,
      fees: "",
      feesPaid: "",
    });
  };

  return (
    <div className="flex justify-center">
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 ">
        <div className="bg-white w-10/12 md:8/12 rounded-lg shadow-lg rounded relative max-h-[90vh]">
          <div className=" w-full py-4 px-2 mb-4 flex items-center ">
            <button
              onClick={() => setIsAdd(false)}
              className="absolute  top-3 right-4 text-gray-500 hover:text-gray-800"
            >
              <FaRegWindowClose size={20} />
            </button>
            <h2 className=" text-xl text-center w-full font-semibold">
              Add Student
            </h2>
          </div>
          <div className={`flex justify-center max-h-[75vh] overflow-y-auto`}>
            <form
              className="flex-col w-9/12 h-content space-y-4"
              onSubmit={submitAddStudent}
            >
              {/* Name Input */}
              <InputField
                type="text"
                id="hs-floating-input-name"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />

              {/* Age Input */}
              <InputField
                type="number"
                id="hs-floating-input-age"
                label="Age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
              />

              {/* Contact Input */}
              <InputField
                type="tel"
                id="hs-floating-input-contact"
                label="Contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
              />

              {/* Batch Select */}
              <SelectBatchField
                id="hs-floating-input-batch"
                label="Batch"
                name="batch"
                value={formData.batch}
                onChange={handleInputChange}
                options={batches}
              />

              {/* FEES */}
              <div className="relative ">
                <InputField
                  type="text"
                  id="hs-floating-input-fees"
                  label="Fees"
                  name="fees"
                  value={formData.fees}
                  onChange={handleInputChange}
                  selectedBatch={formData.batch}
                  options={batches}
                />
              </div>

              {/* Fees Paid Input */}
              <InputField
                type="text"
                id="hs-floating-input-feesPaid"
                label="Fees Paid"
                name="feesPaid"
                value={formData.feesPaid}
                onChange={handleInputChange}
              />

              {/* Student's Pic Input */}
              <FileInput
                label="Student's Pic"
                name="image"
                onChange={handleFileChange}
              />

              {/* Date Of Joining Input */}
              <DateInput
                label="Date Of Joining"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleInputChange}
              />

              {/* Submit Button */}
              <div className="flex-col items-center">
                <button
                  className={`w-full bg-blue-500 text-white px-6 py-2 rounded ${
                    loading ? "opacity-50 pointer-events-none" : ""
                  }`}
                  type="submit"
                >
                  {loading ? "Adding..." : "Add"}
                </button>
                {loading && <LoadingIndicator />}
                {message && <SuccessMessage message={message} />}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
