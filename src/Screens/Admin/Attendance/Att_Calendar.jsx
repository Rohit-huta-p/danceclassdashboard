import React from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

function Calendar({ studentHistory, selectedMonth, setSelectedMonth, selectedStudentId }) {
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getMonthDays = () => {
    const days = [];
    const totalDays = getDaysInMonth(selectedMonth);
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
      days.push(date);
    }
    return days;
  };

  const getAttendanceForDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    const record = studentHistory.find(record => record.date.split('T')[0] === formattedDate);
    return record ? record.present : 'not_marked';
  };

  const navigateMonth = (direction) => {
    setSelectedMonth(new Date(selectedMonth.setMonth(selectedMonth.getMonth() + (direction === 'next' ? 1 : -1))));
  };

  const getMonthName = (date) => date.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigateMonth('prev')} className="p-2 hover:bg-gray-100 rounded-full">
          <LuChevronLeft className="w-5 h-5" />
        </button>
        <h4 className="text-lg font-medium text-gray-900">{getMonthName(selectedMonth)}</h4>
        <button onClick={() => navigateMonth('next')} className="p-2 hover:bg-gray-100 rounded-full">
          <LuChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        {getMonthDays().map((date, index) => {
          const status = getAttendanceForDate(date);
          const dayOfWeek = date.getDay();
          const padding = index === 0 ? `col-start-${dayOfWeek + 1}` : '';
          return (
            <div
              key={date.toISOString()}
              className={`${padding} py-4 rounded-lg flex items-center justify-center ${
                status === 'not_marked'
                  ? 'bg-gray-50 text-gray-500'
                  : status
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-50 text-red-800'
              }`}
            >
              <span className="text-sm font-medium">{date.getDate()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;