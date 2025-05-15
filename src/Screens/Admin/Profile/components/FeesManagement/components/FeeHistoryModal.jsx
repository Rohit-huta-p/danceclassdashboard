import React, { useEffect } from 'react'

const FeeHistoryModal = ({selectedStudent,setShowHistory, }) => {
    useEffect(() => {
        const handleEscKey = (event) => {
          if (event.key === 'Escape') {
            setShowHistory(false);
          }
        };
    
        window.addEventListener('keydown', handleEscKey);
        return () => {
          window.removeEventListener('keydown', handleEscKey);
        };
      }, [setShowHistory]);
  return (
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
                    Pending ₹{index == 0 ? selectedStudent.fees : record.balance || 0}
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
  )
}

export default FeeHistoryModal