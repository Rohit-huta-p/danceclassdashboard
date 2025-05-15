import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Search, History, IndianRupee } from 'lucide-react';
import axiosInstance from '../../../../../axiosInstance';
import Loader2 from '../../../../../components/Loader2';
import FeeHistoryModal from './components/FeeHistoryModal';
const { helper_fetchAllStudents, totalFeesPending_h } = require('../../../../../utilities/student_utils');
function FeesManagement() {

  // Essentials
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalFees, setTotalFees] = useState(0);
  const [totalFeesPending, setTotalFeesPending] = useState(0);
  
  const [showHistory, setShowHistory] = useState(false);
  
  // MONTH NAVIGATION
  const [currentMonth, setCurrentMonth] = useState(new Date());

  
  const calCollectedAmount = async () => {
    try {
      const res = await axiosInstance.get(`api/admin/collectedAmount`);

      setTotalAmount(res.data.totalAmount);
      setTotalFees(res.data.totalFees);
    } catch (error) {
      console.log(error);
      
    }
  }
  
  const navigateMonth = (direction) => {
    setCurrentMonth(new Date(currentMonth.setMonth(
      currentMonth.getMonth() + (direction === 'next' ? 1 : -1)
    )));
  };



  useEffect(() => {
    calCollectedAmount();
    helper_fetchAllStudents(setIsLoading, setStudents)

  }, [])

  useEffect(() => {
    setTotalFeesPending( totalFeesPending_h(students));
  }, [students])
  

  const currMonthStudentHistory = useMemo(() => {
    const currMonthHistory =[];
    students.map((student) => {
      const feeHistory = student.feeHistory;
      // console.log("feeHistory",feeHistory);
      console.log("Last History",feeHistory[feeHistory.length-1]);
      feeHistory.map((record) => {
        const month = new Date(record.date).getMonth();
        const year = new Date(record.date).getFullYear();
        const currMonth = currentMonth.getMonth();
        const currYear = currentMonth.getFullYear();
        // console.log("month",month, "year",year);
        // console.log("currMonth",currMonth,"currYear",year);
        if (month === currMonth && year === currYear) {
          console.log("student: ", student.name,"record",record);
          
          currMonthHistory.push({
            ...record,
            student: student,
            studentId: student._id,
            fees: student.fees,
            feesPaid: student.feesPaid
          });
        }
      })
        
      
    })
    console.log("currMonthHistory",currMonthHistory);
    const lastOccurrences = [];
    const seen = new Set();
    
    for (let i = currMonthHistory.length - 1; i >= 0; i--) {
      if (!seen.has(currMonthHistory[i].studentId)) {
        seen.add(currMonthHistory[i].studentId);
        lastOccurrences.push(currMonthHistory[i]);
      }
    }
    
    lastOccurrences.reverse(); 

    
    console.log("lastOccurrences",lastOccurrences);
    
    return lastOccurrences;
    
  }, [students, currentMonth]);
  console.log("curr_1",currMonthStudentHistory);

  console.log(selectedStudent && selectedStudent.feeHistory);
  
  

  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Fees Management</h1>
        <p className="text-sm text-gray-600">Track and manage student fee payments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* TOTAL COLLECTION CARD */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Total Collection</h3>
            <div className="bg-green-100 p-2 rounded-lg">
              <IndianRupee className="w-3 h-3 md:w-5 md:h-5 text-green-600" />
            </div>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-900">₹{totalAmount}</p>
          <p className="text-sm text-gray-500 mt-2">+₹3,000 from last month</p>
        </div>

        {/* Pending Fees Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Pending Fees</h3>
            <div className="bg-yellow-100 p-2 rounded-lg">
              <IndianRupee className="w-3 h-3 md:w-5 md:h-5 text-yellow-600" />
            </div>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-900">₹{totalFeesPending}</p>
          <p className="text-sm text-gray-500 mt-2">From {students.length} student</p>
        </div>

      {/* TOTAL STUDENTS */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Total Students</h3>
            <div className="bg-blue-100 p-2 rounded-lg">
              <IndianRupee className="w-3 h-3 md:w-5 md:h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-900">{students.length}</p>
          <p className="text-sm text-gray-500 mt-2">All batches</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-medium text-gray-900">
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search students..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-auto"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">

         
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batch
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fee Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {
                isLoading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      <Loader2 />
                    </td>
                  </tr>
                ) : (
                  <>
                  {currMonthStudentHistory.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={student.student.Image}
                            alt={student.student.name}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student.student.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {student.student.batch}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">₹{student.fees}</div>
                          <div className="text-gray-500">
                            Paid: ₹{student.feesPaid ? student.feesPaid : 0} • Pending: ₹{student.fees - student.feesPaid}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          student.fees - student.feesPaid <= 0
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                           {student.fees - student.feesPaid <= 0 ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => {
                            setSelectedStudent(student.student);
                            setShowHistory(true);
                          }}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <History className="w-4 h-4 mr-2" />
                          History
                        </button>
                      </td>
                    </tr>
                  ))}
                  </>
                )
              }
            
            </tbody>

            
          </table>
        </div>
      </div>

      {/* Fee History Modal */}
      {showHistory && selectedStudent && (
        <FeeHistoryModal selectedStudent={selectedStudent} setShowHistory={setShowHistory} />
      )}
    </div>
  );
}

export default FeesManagement;