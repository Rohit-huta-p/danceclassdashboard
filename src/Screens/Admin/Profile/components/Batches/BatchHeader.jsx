import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaMinus, FaPencilAlt } from "react-icons/fa";
import FeesEditor from "./FeesEditor";

const BatchHeader = ({ batchTitle, batches, expanded, onToggle, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleBlurOrEnter = (e) => {
    if (e.type === "blur" || e.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <div className="flex justify-between" onClick={onToggle}>
      <div className="flex items-center">
        {isEditing ? (
          <input
            type="text"
            value={batchTitle}
            onKeyDown={handleBlurOrEnter}
            onBlur={handleBlurOrEnter}
            autoFocus
            className="font-bold bg-transparent w-fit outline-none"
          />
        ) : (
          <p
            onDoubleClick={() => setIsEditing(true)}
            className="font-bold"
          >
            {batchTitle}
          </p>
        )}

        <FeesEditor batchTitle={batchTitle} batches={batches} expanded={expanded} />
      </div>
      <div>
        <button onClick={onToggle}>
          {expanded ? (
            <>
              <FaMinus />
              <button className="" onClick={() => onDelete(batchTitle)}>
                <MdDelete />
              </button>
            </>
          ) : (
            <FaPencilAlt />
          )}
        </button>
      </div>
    </div>
  );
};

export default BatchHeader;