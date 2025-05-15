import { useState, useEffect } from "react";
import { batch } from "react-redux";
import Update_Modal_Mob from "../../Screens/Admin/Home/UpdateStudent/Update_Modal_Mob";

const UpdateStudentModal = ({
  student,
  onClose,
  onUpdate,
  batches,
  formData,
  setFormData,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const calcPercent = () => {
    const percent = ((student.feesPaid / student.fees) * 100).toFixed(0);
    return percent.toString();
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile); // Cleanup
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white h-88 md:w-2/3 rounded-lg shadow-lg p-5 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          X
        </button>
        <h2 className="text-lg font-semibold mb-4">Update {student.name}</h2>
        {isMobile && (
          <Update_Modal_Mob student={student} />
        )}
        <div className="md:grid md:grid-cols-2">

        </div>

        <div className="flex justify-end">
          <button className="border-2 mr-3 px-4 py-1">Cancel</button>
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-800"
            onClick={() => onUpdate(student._id)}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStudentModal;
