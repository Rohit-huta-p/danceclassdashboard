import React, { useState } from "react";
import moment from "moment";
import T_Calendar from "./T_Calendar";
import AddSchedule from "./AddSchedule";
const TimeTable = () => {
    const [isAddSchedule, setisAddSchedule] = useState(false)
    return (
        <div className="mt-5 p-2">
            <h1 className="ml-3 text-xl">Time Table</h1>
            <T_Calendar />
            <div>
                <button className='bg-blue-200 p-1 rounded' onClick={() => setisAddSchedule(true)}>
                    Add Schedule
                </button>
                {
                    isAddSchedule && (
                        <AddSchedule />
                    )
                }
            </div>
        </div>
    )
}

export default TimeTable;
