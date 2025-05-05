const FeeHistoryModal = ({ student, feeHistory, onClose }) => {

  console.log(student);
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="relative bg-white w-8/12 rounded-lg shadow-lg p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            X
          </button>
          <h2 className="text-lg font-semibold mb-4">Fee History {student.name}</h2>
          
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Paid</th>
                <th className="py-2 px-4 border-b">Balance</th>
              </tr>
            </thead>
            <tbody className="overflow-auto">
              {feeHistory.map((entry, index) => {
                return (
                <tr key={entry._id} className={index % 2 == 0 ? "bg-gray-100/70" : ""}>
                  <td className="py-2 px-4 border-b">{entry.status}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                      day: "numeric",
                    })}
                  </td>
                  <td className="py-2 px-4 border-b text-center">{ index == 0 ? 0 : entry.currPaid}</td>
                  <td className="py-2 px-4 border-b text-center">{index == 0 ? student.fees : entry.balance}</td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default FeeHistoryModal;