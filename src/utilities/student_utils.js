
import axiosInstance from "../axiosInstance";

export const helper_fetchAllStudents = async (setLoading, setStudents) => {
    try {
        setLoading(true);
        const res = await axiosInstance.get(`/api/admin/students`);
        setStudents(res.data.students);
        setLoading(false);
        
      } catch (err) {
        console.error('Upload error:', err);
        // Handle error, show error message
      }
}

export const helper_calCollectedAmount = async (setIsLoading,setTotalAmount) => {
  setIsLoading(true);
  try {
    const res = await axiosInstance.get(`api/admin/collectedAmount`);
    // console.log( res.data.totalFees);
    
    setTotalAmount(res.data.totalAmount);
    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
    console.log("Error fetching collected amount:", error);
    
  }
 
}


// FEES
export const totalFeesPending_h = (students) => {
;
  const pending = students.reduce((total, student) => {
    return total + (student.fees - student.feesPaid);
  }, 0);
  console.log("PENFIN", pending);
  return pending;

  
}
