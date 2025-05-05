import { FaPhoneFlip } from "react-icons/fa6";
import { TiPencil } from "react-icons/ti";
import { CiCircleInfo } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

const StudentCard = ({ 
  student, 
  onUpdate, 
  onDelete, 
  onShowFeeHistory,
  onCallStudent,
  onImageClick,
  isUpdated
}) => {

  const handleClick = (phoneNumber) => {


    const message = 'Hello Rohit, I am interested in your services!';

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };
  return (
    <div className={`rounded-lg p-3 shadow-lg ${isUpdated ? "bg-green-100" : "bg-white"}`}>
      {/* Card Header */}
      <div className="relative flex justify-between items-center mb-3 text-sm font-medium text-gray-800">
        <div className="flex items-center">
          <div 
            className="h-[3rem] w-[3rem] rounded-full mr-3"
            style={{ backgroundImage: `url(${student.Image})`, backgroundSize: "cover" }}
            onClick={() => onImageClick(student)}
          ></div>
          <p className="text-base text-center">{student.name}</p>
        </div>
        <div className="flex items-center">
          <a href={`tel:${student.contact}`} className="mr-4" onClick={onCallStudent}>
            <FaPhoneFlip color="blue" size={20} />
          </a>
          <button
              onClick={() => handleClick(student.contact)}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
            >
              WhatsApp
          </button>
        </div>
      </div>

      {/* Fee Status */}
      <div className="flex items-center text-[13px] text-gray-800 mb-3">
        <p className="inline-block mr-2">Fee Status: </p>
        {student.fees - student.feesPaid > 0 ? (
          <div className="flex items-center rounded">
            <p className="text-amber-600 bg-amber-300/30 px-1 text-[12px]">
              Pending <span>({student.fees - student.feesPaid}/-)</span>
            </p>
            <CiCircleInfo 
              size={16} 
              color="blue" 
              className="ml-2 cursor-pointer" 
              onClick={() => onShowFeeHistory(student._id, student)}
            />
          </div>
        ) : (
          <div className="flex items-center">
            <p className="bg-green-200 text-gray-500 px-1 rounded text-[12px]">Paid</p>
            <CiCircleInfo 
              size={16} 
              color="blue" 
              className="ml-2 cursor-pointer" 
              onClick={() => onShowFeeHistory(student._id, student)}
            />
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <div className="flex">
          <div className="mr-2 font-thin text-[9px] bg-blue-100/40 w-fit p-1 rounded-lg">
            Age: <span>{student.age}</span>
          </div>
          <div className="mr-2 font-thin text-[9px] bg-blue-200/40 w-fit p-1 rounded-lg">
            Batch: <span>{student.batch}</span>
          </div>
          <div className="p-1 font-thin text-[9px] bg-blue-200/40 w-fit p-1 rounded-lg">
            DOJ: <span>
              {new Date(student.dateOfJoining).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="flex-col text-end text-sm font-medium">
          {isUpdated && (
            <p className="text-[14px] font-thin text-green-600">Updated Successfully</p>
          )}
          <button
            type="button"
            className="mr-3 inline text-xs font-semibold rounded-lg text-blue-600 hover:text-blue-800"
            onClick={() => onUpdate(student)}
          >
            <TiPencil size={17} />
          </button>
          <button
            type="button"
            className="inline text-xs font-semibold rounded-lg text-red-600 hover:text-red-800"
            onClick={() => onDelete(student._id, student.name)}
          >
            <MdOutlineDelete size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;