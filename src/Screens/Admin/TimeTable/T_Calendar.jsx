import React, { useState } from "react";
import moment from "moment";
const T_Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isSliding, setIsSliding] = useState(false);
    const [isNext, setIsNext] = useState(false); // For controlling sliding direction
  
    const handlePrevWeek = () => {
      setIsNext(false);
      setIsSliding(true);
      // After the animation duration, update the date
      setTimeout(() => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 7);
        setCurrentDate(newDate);
        setIsSliding(false);
    }, 200);
       // Duration of the slide animation
    };
  
    const handleNextWeek = () => {
        setIsNext(true);
        setIsSliding(true);
        // After the animation duration, update the date
        setTimeout(() => {
          const newDate = new Date(currentDate);
          newDate.setDate(currentDate.getDate() + 7);
          setCurrentDate(newDate);
          setIsSliding(false);
        }, 300); // Duration of the slide animation
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
  
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
    function formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    }
  
    const renderCalendarCell = (date) => {
  
    const isToday =
      date.getDate() === new Date().getDate() &&
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear();

      const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
      const weekdayName = weekDays[date.getDay()]; // Get the name of the weekday
    
    
    const cellClass = isToday
      ? "bg-white/80 text-black font-bold " 
      : "text-gray-800";
      return (
        <td key={date} className={cellClass}>
          <div className="py-2 flex flex-col items-center ">
            <p>{weekdayName}</p>
            <p className={`${isToday  ?'text-black' : 'text-black' } font-medium`}>{date.getDate()}</p>
            <p
                tabIndex="0"
                className={`${isToday ? 'text-black font-normal': 'text-gray-500'} focus:outline-none font-bold  `}
              >
                {getMonth().slice(0, 3)} 
              </p>
          </div>
        </td>
      );
    };
  
  //   const getCalendarRows = () => {
  //     const firstDay = new Date(
  //       currentDate.getFullYear(),
  //       currentDate.getMonth(),
  //       1
  //     );
  
  //     const firstDayWeekday = firstDay.getDay(); // 0 (Sunday) - 6 (Saturday)
  
  //     // Create an array of dates for the current month, including previous/next months if necessary
  //     const dates = [];
  //     let daysToAdd = (firstDayWeekday + 6) % 7; // Adjust the calculation to start from Monday
  //     // console.log(daysToAdd);
  
  //     for (let i = 0; i < daysToAdd; i++) {
  //       const prevMonth =
  //       currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
  
  //       const prevYear =
  //         currentDate.getMonth() === 0
  //           ? currentDate.getFullYear() - 1
  //           : currentDate.getFullYear();
  //       console.log("Year", prevYear);
  
  //       dates.push(
  //         new Date(
  //           prevYear,
  //           prevMonth,
  //           daysInMonth(prevMonth, prevYear) - daysToAdd + i + 1
  //         )
  //       );
  //     }
  
  //     for (
  //       let i = 1;
  //       i <= daysInMonth(currentDate.getMonth(), currentDate.getFullYear());
  //       i++
  //     ) {
  //       dates.push(
  //         new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
  //       );
  //     }
  
  //     // Split the dates into rows, ensuring 7 days per row
  //     const rows = [];
  //     for (let i = 0; i < dates.length; i += 7) {
  //       rows.push(dates.slice(i, i + 7));
  //     }
  
  //     return rows.map((row) => (
  //       <tr key={row[0].getTime()}>{row.map(renderCalendarCell)}</tr>
  //     ));
  //   };
  
  //   const daysInMonth = (month, year) => {
  //     console.log(new Date(year, month + 1, 0).getDate());
  
  //     return new Date(year, month + 1, 0).getDate();
  //   };
      const getWeekDays = () => {
      const startOfWeek = moment(currentDate).startOf("isoWeek"); // Start from Monday
      const days = [];
      for (let i = 0; i < 7; i++) {
        days.push(moment(startOfWeek).add(i, "days").toDate());
      }
      return days;
    };
  
    return (
      <div class="flex items-center justify-center py-3 px-1">
        <div class="w-[95%] shadow-lg">
          <div class="md:p-3 p-1 border-2 rounded-t">
            <div class="flex items-center justify-between overflow-x-auto">
                {/* PREV WEEK */}
            <button
                  aria-label="calendar backward"
                  className="text-black bg-gray-300/70 rounded-full "
                  onClick={handlePrevWeek}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-left "
                    width="27"
                    height="27"
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
              <table class="w-full ">
                <thead>
                <tr className="">
                  
                </tr>
                </thead>
                <tbody>
                <tr

                    className={`transition-transform duration-300 transform ${
                        isSliding ? (isNext ? "-translate-x-full" : "translate-x-full") : "translate-x"
                    }`}
                >{getWeekDays().map(renderCalendarCell)}</tr>
                </tbody>
              </table>
              {/* NEXT WEEK BUTTON */}
              <button
                  aria-label="calendar forward"
                  className="text-black bg-gray-300/70 rounded-full "
                  onClick={handleNextWeek}
                >
  
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-left "
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
        </div>
      </div>
    );
  };

export default T_Calendar