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
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl my-8">
        <div className="flex justify-between items-center p-4 sm:p-6 border-b">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Attendance History</h3>
            <p className="mt-1 text-sm text-gray-500">
              {selectedStudentHistory.name} - {selectedStudentHistory.batch}
            </p>
          </div>
          <button
            onClick={() => setShowAttendanceHistory(false)}
            className="text-gray-400 hover:text-gray-500"
          >
            <LuX className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 sm:p-6">
          <Calendar
            studentHistory={studentHistory}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedStudentId={selectedStudentHistory._id}
          />
          <AttendanceSummary studentHistory={studentHistory} 
           attendance={attendance}
            selectedStudentId={selectedStudentId}/>
        </div>
      </div>
    </div>
  );
}

export default AttendanceHistoryModal;