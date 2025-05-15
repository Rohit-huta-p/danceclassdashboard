import React from 'react';

function AttendanceSummary({ studentHistory, attendance, selectedStudentId }) {
  const presentDays = studentHistory.filter(record => record.present).length;
  const absentDays = studentHistory.filter(record => !record.present).length;
  const attendanceRate = Math.round((presentDays / Math.max(1, studentHistory.length)) * 100);

  const lastPresentDate = attendance
    .filter(record => record.id === selectedStudentId && record.present)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]?.date;

  return (
    <div className="bg-gray-50 rounded-md p-3">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="text-center">
          <p className="text-xs text-gray-500">Present Days</p>
          <p className="text-lg font-semibold text-green-600">{presentDays}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Absent Days</p>
          <p className="text-lg font-semibold text-red-600">{absentDays}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Attendance Rate</p>
          <p className="text-lg font-semibold text-indigo-600">{attendanceRate}%</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Last Present</p>
          <p className="text-lg font-semibold text-gray-900">
            {lastPresentDate ? new Date(lastPresentDate).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AttendanceSummary;
