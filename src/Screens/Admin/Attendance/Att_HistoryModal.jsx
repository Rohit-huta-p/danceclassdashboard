import React from 'react';
import Calendar from './Att_Calendar';
import AttendanceSummary from './Att_Summary';
import { LuX } from 'react-icons/lu';

function AttendanceHistoryModal({
  selectedStudentHistory,
  setShowAttendanceHistory,
  studentHistory,
  selectedMonth,
  setSelectedMonth,
  attendance,
  selectedStudentId,
}) {
  return (
    <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6 transform scale-90 ">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Attendance History</h3>
            <p className="text-xs text-gray-500 mt-1">
              {selectedStudentHistory.name} - {selectedStudentHistory.batch}
            </p>
          </div>
          <button
            onClick={() => setShowAttendanceHistory(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <LuX className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <Calendar
            studentHistory={studentHistory}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedStudentId={selectedStudentHistory._id}
          />
          <AttendanceSummary
            studentHistory={studentHistory}
            attendance={attendance}
            selectedStudentId={selectedStudentId}
          />
        </div>
      </div>
    </div>
  );
}

export default AttendanceHistoryModal;
