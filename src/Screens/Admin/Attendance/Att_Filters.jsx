import React from 'react';
import { CiCalendar } from 'react-icons/ci';

function AttendanceFilters({ selectedDate, setSelectedDate, selectedBatch, setSelectedBatch, searchTerm, setSearchTerm }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
        <CiCalendar className="w-5 h-5" />
        Daily Attendance
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <select
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="all">All Batches</option>
          <option value="A">6:00 - 7:00 PM</option>
          <option value="B">7:00 - 8:00 PM</option>
        </select>
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}

export default AttendanceFilters;