import React, { useContext, useEffect, useMemo, useState } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContexts';
import axiosInstance from '../../../axiosInstance';
import AttendanceHeader from './Att_Header';
import AttendanceFilters from './Att_Filters';
import AttendanceTable from './Att_Table';
import AttendanceHistoryModal from './Att_HistoryModal';

function Attendance() {
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [attendance, setAttendance] = useState([]);
  const [showAttendanceHistory, setShowAttendanceHistory] = useState(false);
  const [selectedStudentHistory, setSelectedStudentHistory] = useState(null);
  const [studentHistory, setStudentHistory] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const { batches } = useContext(GlobalContext);

  const fetchAttendance = async () => {
    const date = new Date(selectedDate).toISOString();
    try {
      const response = await axiosInstance.get(`/api/student/attendance/${date}`);
      setAttendance(response.data.records);
    } catch (error) {
      if (error.response?.status === 404) {
        setAttendance([]);
      } else {
        console.error('Error fetching attendance:', error);
      }
    }
  };

  const refresh = async () => {
    try {
      const res = await axiosInstance.get('/api/admin/students');
      if (res.data.students) {
        setStudents(res.data.students);
      }
      fetchAttendance();
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const searchStudents = useMemo(() => {
    if (!searchTerm) return students;
    return students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.contact?.includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  const filteredStudents = useMemo(() => {
    if (selectedBatch === 'all') return searchStudents;
    return searchStudents.filter(student => student.batch === batches[selectedBatch]);
  }, [selectedBatch, searchStudents, batches]);

  const submitAttendance = async () => {
    try {
      setIsLoading(true);
      const date = new Date(selectedDate).toISOString();
      await axiosInstance.put(`api/student/attendance/${date}`, attendance);
      fetchAttendance();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error submitting attendance:', error);
    }
  };

  const handleViewHistory = (student) => {
    setSelectedStudentHistory(() => student);
    fetchStudentHistory(student._id);
    setShowAttendanceHistory(true);
  };

  const fetchStudentHistory = async (studentId) => {
    try {
      const res = await axiosInstance.get(`/api/student/attendance/${studentId}/studentHistory`);
      setStudentHistory(res.data.studentAttendance);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    fetchAttendance();
  }, [selectedDate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <AttendanceHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <AttendanceFilters
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedBatch={selectedBatch}
            setSelectedBatch={setSelectedBatch}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <AttendanceTable
            filteredStudents={filteredStudents}
            attendance={attendance}
            setAttendance={setAttendance}
            isLoading={isLoading}
            handleViewHistory={handleViewHistory}
          />
          <div className="mt-6 flex justify-end">
            <button
              onClick={submitAttendance}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit Attendance
            </button>
          </div>
        </div>
      </main>
      {showAttendanceHistory && selectedStudentHistory && (
        <AttendanceHistoryModal
          attendance={attendance}
          selectedStudentId={selectedStudentHistory._id}
          selectedStudentHistory={selectedStudentHistory}
          setShowAttendanceHistory={setShowAttendanceHistory}
          studentHistory={studentHistory}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
      )}
    </div>
  );
}

export default Attendance;