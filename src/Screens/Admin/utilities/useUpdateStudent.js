// src/hooks/useUpdateStudent.js
import { useState } from "react";
import axiosInstance from "../../../axiosInstance";

export const useUpdateStudent = (students, setStudents) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [popUpdate, setPopUpdate] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const openUpdateModal = (student) => {
    setSelectedStudent(student);
    setPopUpdate(true);
  };

  const closeUpdateModal = () => {
    setSelectedStudent(null);
    setPopUpdate(false);
  };

  const updateStudent = async (id, formData) => {
    try {
      const uploadData = new FormData();
      uploadData.append("name", formData.name);
      uploadData.append("age", formData.age);
      uploadData.append("contact", formData.contact);
      uploadData.append("batch", formData.batch);
      uploadData.append("dateOfJoining", formData.dateOfJoining);
      uploadData.append("feesPaid", formData.feesPaid);
      uploadData.append("fees", formData.fees);

      const res = await axiosInstance.put(
        `/api/admin/updatestudent/${id}`,
        uploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { success, data } = res.data;

      if (success) {
        setShowMessage(success);
        setStudents(
          students.map((student) =>
            student._id === id ? data : student
          )
        );
        closeUpdateModal();
      }
    } catch (error) {
      console.error("Failed to update student:", error);
    }
  };

  return {
    selectedStudent,
    setSelectedStudent,
    popUpdate,
    setPopUpdate,
    showMessage,
    setShowMessage,
    openUpdateModal,
    closeUpdateModal,
    updateStudent,
  };
};
