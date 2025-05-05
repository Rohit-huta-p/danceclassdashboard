import React from 'react';
import Loader from '../../../components/Loader';
import { LuCheckCircle2, LuAlertCircle, LuHistory } from 'react-icons/lu';

function AttendanceTable({ filteredStudents, attendance, setAttendance, isLoading, handleViewHistory }) {
  const isPresent = (studentId) => {
    const record = attendance.find(record => record.student === studentId);
    return record ? record.present : false;
  };

  const toggleAttendance = (studentId, present) => {
    const record = attendance.find(record => record.student === studentId);
    if (record) {
      record.present = present;
      setAttendance([...attendance]);
    } else {
      setAttendance([...attendance, { student: studentId, present }]);
    }
  };

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Student</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Batch</th>
            <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Attendance</th>
            <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">History</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {isLoading && <Loader loading={isLoading} />}
          {filteredStudents.map(student => {
            const present = isPresent(student._id);
            return (
              <tr key={student._id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                  <div className="flex items-center">
                    <img
                      src={student.Image}
                      alt={student.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{student.name}</div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{student.batch}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                  <button
                    onClick={() => toggleAttendance(student._id, !present)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      present ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {present ? (
                      <>
                        <LuCheckCircle2 className="w-4 h-4 mr-1" />
                        Present
                      </>
                    ) : (
                      <>
                        <LuAlertCircle className="w-4 h-4 mr-1" />
                        Absent
                      </>
                    )}
                  </button>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                  <button
                    onClick={() => handleViewHistory(student)}
                    className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-800"
                  >
                    <LuHistory className="w-4 h-4 mr-1" />
                    View History
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;