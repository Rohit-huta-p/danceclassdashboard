import React, { useContext, useEffect, useRef, useState } from "react";
import axiosInstance from "../../../../axiosInstance";
import { MdDelete } from "react-icons/md";
import { FaMinus } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { GlobalContext } from "../../../../contexts/GlobalContexts";

const Card = ({
  ageGroups,
  setageGroups,
}) => {

  const [isAddBatch, setisAddBatch] = useState(false);
  const [ageGroupName, setageGroupName] = useState("");
  const [timing, setTiming] = useState("");
  const [isAddTimingInput, setisAddTimingInput] = useState(false)
  const [message, setMessage] = useState("");
  const [error, seterror] = useState("")

  const {batches, setBatches} = useContext(GlobalContext);
  // Add Batch
  const addAgeGroupName = async () => {
    try {
      const response = await axiosInstance.post("/api/user/add/agegroup", {ageGroupName});
      console.log(response.data.ageGroups);
      
      setageGroups([...ageGroups, response.data.ageGroup]);
      setisAddBatch(false);
      setMessage(response.data.message)
    } catch (error) {
      seterror(error.response.data.error);
      
    }
  };

  // Delete batch
  const deleteAgeGroup = async (ageGroupName) => {
    try {
      const response = await axiosInstance.post("/api/user/deleteagegroup", {
        ageGroupName,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTiming = async (groupName, timing) => {
    try {
      console.log(timing);

      const response = await axiosInstance.post("/api/user/addtimings", {
        groupName,
        timing,
      });
      setMessage(response.data.message);
      batches.map(batch => {
        if(batch.ageGroup === groupName) batch.timings.push(timing)
      })
    console.log( batches);
    
      setTiming("");
      setisAddTimingInput(false)
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTiming = async (groupName, timing) => {
    try {
      const response = await axiosInstance.post("/api/user/deletetiming", {
        groupName,
        timing,
      });

    } catch (error) {
      console.log(error);
    }
  };

  // FEES
  const [feesEditState, setFeesEditState] = useState({}); // Track fees editing state per group
  const [fees, setFees] = useState(0);

  const addFees = async (groupName, fees) => {
    try {
      const response = await axiosInstance.post("/api/user/addfees", {
        groupName,
        fees,
      });
      const updatedBatches = batches.map((batch) => {
        if (batch.ageGroup === groupName) {
          return {
            ...batch,
            fees: fees,  // Update the fees for the matching age group
          };
        }
        return batch; // Return the batch unchanged if not matching
      });
      setBatches(updatedBatches)
      setFeesEditState((prev) => ({ ...prev, [groupName]: false }))
    } catch (error) {
      console.log(error);
      
    }
  };

  const contentRefs = useRef([]);
  // Keep the refs in sync with the allAgeGroups array length
  if (contentRefs.current.length !== ageGroups.length) {
    contentRefs.current = Array(ageGroups.length)
      .fill()
      .map((_, i) => contentRefs.current[i] || React.createRef());
  }

  const [expandedCard, setExpandedCard] = useState(null);
  const toggleCard = (groupName) => {

    setExpandedCard(expandedCard === groupName ? null : groupName); // Toggle expand/collapse
  };


  // HANDLE DOUBLE CLICK
  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const handleBlurOrEnter = (e) => {
    if (e.type === 'blur' || e.key === 'Enter') {
      setIsEditing(false); // Exit edit mode
    }
  };



  return (
    <div className="">
      <div className="">
        {ageGroups.length > 0 ? (
    // AGE GROUPS PRESENT
          <div className="p-2 grid gap-3">
            {ageGroups.map((groupName, index) => (
              <div
                key={index}
                className={`p-3 transition-all duration-500 ease-in-out bg-blue-100/70 p-1 rounded-lg`}
                style={{
                  height: expandedCard === groupName ? `100%` : "50px",
                  overflow: "hidden",
                }}
              >
                <div className="flex justify-between">
                  <div className="flex items-center">
                    {/* GROUP NAME */}
                    {isEditing ? (
                        <input
                            type="text"
                            value={groupName}
                            // onChange={handleChange}
                            // onBlur={handleBlurOrEnter} // Save on blur (focus loss)
                            onKeyDown={handleBlurOrEnter} // Save on Enter key
                            autoFocus
                            className="font-bold bg-transparent w-fit outline-none"
                          />
                        ) : (
                          <p onDoubleClick={() => setIsEditing(true)} className="font-bold">
                            {groupName}
                          </p>
                      )}

                    <p className="font-thin text-sm ml-4 flex items-center">
                      Fees:{" "}
                      
                      {!feesEditState[groupName] && ( 
                        <span className="ml-1">
                          {
                            batches
                              .filter((batch) => batch.ageGroup === groupName)
                              .map((batch, idx) => (
                                <span key={idx}>{batch.fees}</span>
                              ))
                          }
                        </span>
                      )}
                      {expandedCard === groupName && (
                        <>
                          {feesEditState[groupName] ? (
                            <>
                              <input
                                type="number"
                                className="bg-transparent ml-1 focus:outline-none"
                                placeholder={`Enter ${groupName} fees`}
                                value={fees}
                                onChange={(e) => setFees(e.target.value)}
                              />
                              <button
                                type="button"
                                className="ml-1 bg-amber-200 px-1 rounded-full"
                                onClick={() => addFees(groupName, fees)}
                              >
                                +
                              </button>
                              <button
                                type="button"
                                className="ml-1 bg-red-400 text-white px-1 rounded-full"
                                onClick={() => setFeesEditState((prev) => ({ ...prev, [groupName]: false }))}
                              >
                                x
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => setFeesEditState((prev) => ({ ...prev, [groupName]: true }))}
                              >
                                <FaPencilAlt
                                  size={13}
                                  color="blue"
                                  className="ml-2"
                                />
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </p>
                  </div>
                  <div>
                    <button onClick={() => toggleCard(groupName, index)}>
                      {expandedCard === groupName ? (
                        (<>
                        <FaMinus />
                        <button className="" onClick={() => deleteAgeGroup(groupName)}><MdDelete /></button>
                        </> )
                      ) : (
                        <FaPencilAlt />
                      )}
                    </button>
                  </div>
                </div>
                <hr />

                <div>
                  {expandedCard === groupName && (
                    <div>
      {/*individual group timings */}
                      {batches
                        .filter((batch) => batch.ageGroup === groupName)
                        .map((batch, idx) => (
                          <div key={idx}>
                            {batch.timings.length > 0 ? (
                              batch.timings.map((timing, timingIdx) => (
                                <div
                                  key={timingIdx}
                                  className="mt-2 flex justify-between items-center"
                                >
                                  <p>{timing}</p>
                                  <FaMinus
                                    className="cursor-pointer text-red-600 hover:text-red-400"
                                    onClick={() =>
                                      deleteTiming(groupName, timing)
                                    }
                                  />
                                </div>
                              ))
                            ) : (
                              <p>No timings available.</p>
                            )}
                          </div>
                        ))}
                     
                      
                      {
                        isAddTimingInput ? (
                          <>
                            <div className="flex justify-between bg-blue-100 p-1">
                              <input
                                type="text"
                                  className="bg-blue-100 p-1 focus:outline-none w-full"
                                  placeholder="Add timings"
                                  value={timing}
                                  onChange={(e) => setTiming(e.target.value)}
                                />
                                <button className="bg-teal-700 text-white px-2 rounded" onClick={() => addTiming(groupName, timing)}>
                                  Add
                                </button>
                            </div>
                          </>
                        ): (
                          <button className="bg-teal-700 w-full text-white text-center cursor-pointer p-1 rounded" onClick={() => setisAddTimingInput(true)}>Add Timing</button>
                        )
                      }
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isAddBatch && (
              <div>
              <div className="flex justify-between bg-blue-100/70 p-1 w-full rounded-lg px-2 py-3">
                  <div>
                    <input
                      type="text"
                      name="Batch_category"
                      placeholder="Age Group"
                      value={ageGroupName}
                      className="bg-transparent w-full focus:outline-none"
                      onChange={(e) => setageGroupName(e.target.value)}
                    /> 
                    {error && (
                      <p className="text-red-500 text-xs ">
                        {error}
                      </p>
                    )}
                  </div>
                  <button type="button" className="text-end" onClick={() => addAgeGroupName()}>
                    Add
                  </button>
                  
              </div>
             
              </div>
            )}
          </div>
        ) : (
  // EMPTY AGE GROUPS
          <div>
            <div className="flex justify-between items-center py-1">
              <p className="text-center">No Batches Added</p>
              <button
                type="button"
                className="mr-3 bg-green-200 px-2 rounded-lg hover:bg-green-300"
                onClick={() => setisAddBatch(true)}
              >
                +
              </button>
            </div>

        {/* ADD AGE GROUP */}
            {isAddBatch && (
              <div className="flex justify-center items-center">
                <div className="h-20">
                  <input
                    type="text"
                    name="Batch_category"
                    placeholder="Age Group"
                    value={ageGroupName}
                    className="bg-gray-200 p-1"
                    onChange={(e) => setageGroupName(e.target.value)}
                  />
                  <button
                    type="button"
                    className="bg-gray-200 p-1"
                    onClick={() => addAgeGroupName()}
                  >
                    Add
                  </button>
                </div>
              </div>
            
            )}
          </div>
        )}
      </div>
      {message && (
                <p className="text-green-800 font-thin text-center text-xs">
                  {message}
                </p>
              )}
      <button className="bg-blue-800 w-full rounded text-white p-2" onClick={() => setisAddBatch(true)}>
        Add Batch
      </button>
    </div>
  );
};

export default Card;
