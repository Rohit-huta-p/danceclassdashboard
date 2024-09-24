import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../../../axiosInstance";
import { MdDelete } from "react-icons/md";
import { FaMinus } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";

const Card = ({
  allAgeGroups,
  setAllAgeGroups,
  batchTimings,
  setBatchTimings,
}) => {



  const [isAddBatch, setisAddBatch] = useState(false);
  const [ageGroupName, setageGroupName] = useState("");
  const [timing, setTiming] = useState("");
  const [isAddTimingInput, setisAddTimingInput] = useState(false)
  const [message, setMessage] = useState("");

  // Add Batch
  const addAgeGroupName = async () => {
    try {
      const response = await axiosInstance.post("/api/user/add/agegroup", {
        ageGroupName,
      });
      setAllAgeGroups(response.data.ageGroups);
      setisAddBatch(false);
    } catch (error) {
      console.log(error);
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

      setBatchTimings((prevTimings) => {
        return prevTimings.map((batch) => {
          if (batch.ageGroup === groupName) {
            return {
              ...batch,
              timings: [...batch.timings, timing],
            };
          }
          return batch;
        });
      });
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
      setBatchTimings(response.data.batchTimings);
    } catch (error) {
      console.log(error);
    }
  };

  // FEES
  const [feesEditState, setFeesEditState] = useState({}); // Track fees editing state per group
  const [fees, setFees] = useState(0);
  const [isShowFees, setisShowFees] = useState(false);
  const addFees = async (groupName, fees) => {
    try {
      const response = await axiosInstance.post("/api/user/addfees", {
        groupName,
        fees,
      });
      console.log(response.data.batchTimings);
      setBatchTimings((prevTimings) => {
        return prevTimings.map((batch) => {
          if (batch.ageGroup === groupName) {
            return {
              ...batch,
              fees: fees,
            };
          }
          return batch;
        });
      });
      setisShowFees(false)
    } catch (error) {}
  };

  const contentRefs = useRef([]);
  // Keep the refs in sync with the allAgeGroups array length
  if (contentRefs.current.length !== allAgeGroups.length) {
    contentRefs.current = Array(allAgeGroups.length)
      .fill()
      .map((_, i) => contentRefs.current[i] || React.createRef());
  }

  const [expandedCard, setExpandedCard] = useState(null);
  const toggleCard = (groupName) => {

    setExpandedCard(expandedCard === groupName ? null : groupName); // Toggle expand/collapse
  };

  console.log(batchTimings);

  return (
    <div className="">
      <div>
        {allAgeGroups.length > 0 ? (
          <div className="p-2 grid  gap-3">
            {allAgeGroups.map((groupName, index) => (
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
                    <p className="font-bold">{groupName}</p>

                    <p className="font-thin text-sm ml-4 flex items-center">
                      Fees:{" "}
                      
                      {!feesEditState[groupName] && ( // Check individual editing state
                        <span className="ml-1">
                          {
                            batchTimings
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
                      {/* Debugging individual group timings */}
                      {batchTimings
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
                      {message && (
                        <p className="text-green-600 font-thin text-sm">
                          {message}
                        </p>
                      )}
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
              <div className="ml-2 bg-blue-100/70 p-1 w-fit rounded-lg px-2 py-3">
                <div className="flex">
                  <input
                    type="text"
                    name="Batch_category"
                    placeholder="Age Group"
                    value={ageGroupName}
                    className="bg-transparent"
                    onChange={(e) => setageGroupName(e.target.value)}
                  />
                  <button type="button" onClick={() => addAgeGroupName()}>
                    Add
                  </button>
                  <hr />
                </div>
              </div>
            )}
          </div>
        ) : (
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
                  <hr />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <button onClick={() => setisAddBatch(true)}>+</button>
    </div>
  );
};

export default Card;
