const ImageModal = ({ student, onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white w-4/6 h-5/6 rounded-lg shadow-lg py-3 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            X
          </button>
          <img
            src={student.Image}
            alt="student"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    );
  };
  
  export default ImageModal;