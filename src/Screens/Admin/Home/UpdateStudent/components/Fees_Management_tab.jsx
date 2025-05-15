import React from "react";

const Fees_Management_tab = ({student, formData, handleInputChange, handleFileChange, batches}) => {
  console.log(student);
  
   const calcPercent = () => {
      const percent = ((student.feesPaid / student.fees) * 100).toFixed(0);
      return percent.toString();
    };
  
  return (
    <div className="p-4">


      {/* Fees Description card */}
      <div className="bg-gray-100 p-6 rounded-xl mt-5">
        <div className="flex justify-evenly">
          <div>
            <h2 className="text-sm">Total Fees</h2>
            <p className="font-semibold">₹{student.fees || '11'}</p>
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
  );
};

export default Fees_Management_tab;
