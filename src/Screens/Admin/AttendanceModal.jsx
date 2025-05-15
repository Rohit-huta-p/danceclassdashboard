import React, { useState } from "react";
import moment from "moment-timezone";
const AttendanceModal = ({ currStudent, closeModal }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    ); // Set to first day of previous month
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    ); // Set to first day of next month
    setCurrentDate(newDate);
  };

  const getMonth = () => {
    const monthIndex = currentDate.getMonth(); // Get the month as a number (0-11)
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthIndex];
  };

  const getYear = () => {
    return currentDate.getFullYear();
  };

  const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  function formatDate(date) {
    return moment(date).format("DD/MM/YYYY");
  }
  const getAttendanceStatus = (date) => {
    const attendanceData = currStudent.attendance;
    //  console.log("MODAL",attendanceData);

    const formattedDate = formatDate(date);
    // console.log("EVERY DATE FORMATTED: ", formattedDate);

    const foundAttendance = attendanceData.find((entry) => {
      const attendanceDate = formatDate(entry.date);

      return attendanceDate === formattedDate;
    });

    if (foundAttendance) {
      return foundAttendance.status;
    } else {
      // Handle missing attendance data (e.g., return 'absent', or handle differently)
      return "ooops";
    }
  };

  const renderCalendarCell = (date) => {
    // console.log("BEFORE", date);
    const attendanceStatus = getAttendanceStatus(date);
    // console.log("Date: inside rednderCalendar", date);

    let cellClass;
    if (attendanceStatus == "present") {
      cellClass = "bg-green-500 text-white"; // Green background for present
    } else if (attendanceStatus == "absent") {
      cellClass = "bg-red-500 text-white"; // Red background for absent
    } else {
      const isCurrentMonth = date.getMonth() === currentDate.getMonth();
      cellClass = isCurrentMonth ? "text-gray-200" : "text-gray-400";
    }
    return (
      <td key={date} className={cellClass}>
        <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p className="text-base font-medium">{date.getDate()}</p>
        </div>
      </td>
    );
  };

  const getCalendarRows = () => {
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    console.log(firstDay);

    const firstDayWeekday = firstDay.getDay(); // 0 (Sunday) - 6 (Saturday)
    console.log(firstDayWeekday);

    // Create an array of dates for the current month, including previous/next months if necessary
    const dates = [];
    let daysToAdd = (firstDayWeekday + 6) % 7; // Adjust the calculation to start from Monday
    // console.log(daysToAdd);

    for (let i = 0; i < daysToAdd; i++) {
      const prevMonth =
        currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
      console.log("MONTH", prevMonth);

      const prevYear =
        currentDate.getMonth() === 0
          ? currentDate.getFullYear() - 1
          : currentDate.getFullYear();
      console.log("Year", prevYear);

      dates.push(
        new Date(
          prevYear,
          prevMonth,
          daysInMonth(prevMonth, prevYear) - daysToAdd + i + 1
        )
      );
    }

    for (
      let i = 1;
      i <= daysInMonth(currentDate.getMonth(), currentDate.getFullYear());
      i++
    ) {
      dates.push(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
      );
    }

    // Split the dates into rows, ensuring 7 days per row
    const rows = [];
    for (let i = 0; i < dates.length; i += 7) {
      rows.push(dates.slice(i, i + 7));
    }

    return rows.map((row) => (
      <tr key={row[0].getTime()}>{row.map(renderCalendarCell)}</tr>
    ));
  };

  const daysInMonth = (month, year) => {
    console.log(new Date(year, month + 1, 0).getDate());

    return new Date(year, month + 1, 0).getDate();
  };



  return (
    <div className=" flex items-center justify-center z-50 bg-black bg-opacity-50 ">
      <div className="bg-white  rounded-lg shadow-lg p-5 relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          X
        </button>

        <div className=" mb-2">
          <h4 className="text-lg font-bold text-center"> Monthly Attendance</h4>
          <h3 className="text-center">{currStudent.name}ssss</h3>
          {/*  */}

          <div class="flex items-center justify-center py-8 px-4">
            <div class="max-w-sm w-full shadow-lg">
              <div class="md:p-8 p-5 dark:bg-gray-800 bg-white rounded-t">
                <div class="px-4 flex items-center justify-between">
                  <span
                    tabIndex="0"
                    class="focus:outline-none  text-base font-bold dark:text-gray-100 text-gray-800"
                  >
                    {getMonth()} {getYear()}
                  </span>
                  <div class="flex items-center">
                    <button
                      aria-label="calendar backward"
                      class="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100"
                      onClick={handlePrevMonth}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-chevron-left"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <polyline points="15 6 9 12 15 18" />
                      </svg>
                    </button>
                    <button
                      aria-label="calendar forward"
                      class="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100"
                      onClick={handleNextMonth}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler  icon-tabler-chevron-right"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <polyline points="9 6 15 12 9 18" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="flex items-center justify-between pt-12 overflow-x-auto">
                  <table class="w-full ">
                    <thead>
                      <tr>
                        {weekDays.map((day, index) => (
                          <th index={index}>
                            <div class="w-full flex justify-center">
                              <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                                {day}
                              </p>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>{getCalendarRows()}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default AttendanceModal;
