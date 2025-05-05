import { useState, useEffect } from "react";
import { batch } from "react-redux";

const UpdateStudentModal = ({
  student,
  onClose,
  onUpdate,
  batches,
  formData,
  setFormData,
}) => {
  console.log(student);
  console.log(formData);
  

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const calcPercent = () => {
    const percent = ((student.feesPaid / student.fees) * 100).toFixed(0);
    return percent.toString();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-2/3 rounded-lg shadow-lg p-5 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          X
        </button>

        <h2 className="text-lg font-semibold mb-4">Update {student.name}</h2>

        <div className="grid grid-cols-2">
          {/* PERSONAL INFORMATION */}
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

          {/* FEES SECTION */}
          <div className="p-4">
            <h2 className="text-xl">Fees Management</h2>

            {/* Fees Description card */}
            <div className="bg-gray-100 p-6 rounded-xl mt-5">
              <div className="flex justify-evenly">
                <div>
                  <h2 className="text-sm">Total Fees</h2>
                  <p className="font-semibold">₹{student.fees}</p>
                </div>
                <div>
                  <h2 className="text-sm">Paid Amount</h2>
                  <p className="text-green-600 font-semibold">
                    ₹{student.feesPaid ? student.feesPaid : "0"}
                  </p>
                </div>
                <div>
                  <h2 className="text-sm">Pending</h2>
                  <p className="text-red-500 font-semibold">
                    ₹
                    {student.feesPaid
                      ? student.fees - student.feesPaid
                      : student.fees}
                  </p>
                </div>
              </div>
              {/* fees bar */}
              <div className="mt-5">
                <div className="h-2 rounded-full bg-gray-200">
                  <div
                    className={` h-2 rounded bg-green-500`}
                    style={{ width: `${calcPercent()}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-7">
              <label htmlFor="feeUpdate" className="text-sm text-gray-700 ">
                Update Payment Amount
              </label>
              <input
                type="text"
                value={formData.feesPaid}
                onChange={handleInputChange}
                name="feesPaid"
                placeholder="200"
                className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="border-2 mr-3 px-4 py-1">
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-800"
            onClick={() => onUpdate(student._id)}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStudentModal;
