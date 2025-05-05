import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Search, History, IndianRupee } from 'lucide-react';
import axiosInstance from '../../../../../axiosInstance';
import Loader2 from '../../../../../components/Loader2';
const { helper_fetchAllStudents, totalFeesPending_h } = require('../../../../../utilities/student_utils');
function FeesManagement() {

  // Essentials
  const [isLoading, setIsLoading] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showHistory, setShowHistory] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [students, setStudents] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalFees, setTotalFees] = useState(0);
  const [totalFeesPending, setTotalFeesPending] = useState(0);
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

  // const students = [
  //   {
  //     id: 1,
  //     name: "Sarah Johnson",
  //     image: "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=200",
  //     batch: "6:00 - 7:00 PM",
  //     totalFees: 5000,
  //     paidAmount: 3000,
  //     pendingAmount: 2000,
  //     status: "pending",
  //     history: [
  //       { date: "2024-03-01", amount: 2000, pending: 3000 },
  //       { date: "2024-02-01", amount: 1000, pending: 2000 },
  //     ]
  //   },
  //   {
  //     id: 2,
  //     name: "Michael Chen",
  //     image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200",
  //     batch: "7:00 - 8:00 PM",
  //     totalFees: 5000,
  //     paidAmount: 5000,
  //     pendingAmount: 0,
  //     status: "paid",
  //     history: [
  //       { date: "2024-03-01", amount: 3000, pending: 0 },
  //       { date: "2024-02-01", amount: 2000, pending: 3000 },
  //     ]
  //   }
  // ];

  useEffect(() => {
    calCollectedAmount();
    helper_fetchAllStudents(setIsLoading, setStudents)

  }, [])

  useEffect(() => {
    setTotalFeesPending( totalFeesPending_h(students));
  }, [students])
  

  console.log(students);
  

  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Fees Management</h1>
        <p className="text-gray-600">Track and manage student fee payments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* TOTAL COLLECTION CARD */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Total Collection</h3>
            <div className="bg-green-100 p-2 rounded-lg">
              <IndianRupee className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">₹{totalAmount}</p>
          <p className="text-sm text-gray-500 mt-2">+₹3,000 from last month</p>
        </div>

        {/* Pending Fees Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Pending Fees</h3>
            <div className="bg-yellow-100 p-2 rounded-lg">
              <IndianRupee className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">₹{totalFeesPending}</p>
          <p className="text-sm text-gray-500 mt-2">From {students.length} student</p>
        </div>

      {/* TOTAL STUDENTS */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Total Students</h3>
            <div className="bg-blue-100 p-2 rounded-lg">
              <IndianRupee className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{students.length}</p>
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
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={student.Image}
                            alt={student.name}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {student.batch}
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
                            setSelectedStudent(student);
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Payment History
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{selectedStudent.name}</p>
                </div>
                <button
                  onClick={() => setShowHistory(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                {selectedStudent.feeHistory.map((record, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(record.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Pending ₹{index == 0 ? selectedStudent.fees : record.balance}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-medium text-green-600">₹{ index == 0 ? 0 : record.currPaid}</p>
                        <p className="text-xs text-gray-500">Amount Paid</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeesManagement;