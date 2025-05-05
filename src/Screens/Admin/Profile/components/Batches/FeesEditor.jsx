import React, { useState, useContext } from "react";
import { FaPencilAlt } from "react-icons/fa";
import axiosInstance from "../../../axiosInstance";
import { GlobalContext } from "../../../contexts/GlobalContexts";

const FeesEditor = ({ batchTitle, batches, expanded }) => {
  const [fees, setFees] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const { setIsLoading, setBatches } = useContext(GlobalContext);

  const addFees = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.post("/api/user/addfees", {
        batchTitle,
        fees,
      });
      
      setBatches(prevBatches => 
        prevBatches.map(batch => 
          batch.batchTitle === batchTitle 
            ? { ...batch, fees } 
            : batch
        )
      );
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!expanded) return null;

  return (
    <p className="font-thin text-sm ml-4 flex items-center">
      Fees:{" "}
      {!isEditing ? (
        <>
          <span className="ml-1">
            {batches
              .filter((batch) => batch.batchTitle === batchTitle)
              .map((batch, idx) => (
                <span key={idx}>{batch.fees}</span>
              ))}
          </span>
          <button
            type="button"
            onClick={() => setIsEditing(true)}
          >
            <FaPencilAlt size={13} color="blue" className="ml-2" />
          </button>
        </>
      ) : (
        <>
          <input
            type="number"
            className="bg-transparent ml-1 focus:outline-none"
            placeholder={`Enter ${batchTitle} fees`}
            value={fees}
            onChange={(e) => setFees(e.target.value)}
          />
          <button
            type="button"
            className="ml-1 bg-amber-200 px-1 rounded-full"
            onClick={addFees}
          >
            +
          </button>
          <button
            type="button"
            className="ml-1 bg-red-400 text-white px-1 rounded-full"
            onClick={() => setIsEditing(false)}
          >
            x
          </button>
        </>
      )}
    </p>
  );
};

export default FeesEditor;