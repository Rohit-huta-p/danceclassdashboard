import React, { useContext, useState } from 'react'
import {GlobalContext} from '../../../contexts/GlobalContexts';
import { batch } from 'react-redux';


const AddSchedule = () => {
  const { batches } = useContext(GlobalContext);
  const [batchSelected, setBatchSelected] = useState("");
console.log(batchSelected);

  return (
    <div className='p-4'>
    {/* Batch Selection */}
    <div className='flex space-x-2 mb-4'>
      {batches.map((batch, index) => (
        <button
          key={index}
          type='button'
          className={`px-2 py-1 text-sm border-2 ${batchSelected === batch.ageGroup ? 'bg-amber-300 border-amber-400' : 'bg-amber-100 border-gray-300'} rounded-full`}
          onClick={() => setBatchSelected(batch.ageGroup)}>
          {batch.ageGroup}
        </button>
      ))}
    </div>
  
    {/* Schedule Form */}
    <div>
      {batches.map((batch, index) => {
        if (batch.ageGroup === batchSelected) {
          return batch.timings.map((timing, timingIndex) => (
            <div key={timingIndex} className='flex items-center space-x-4 py-2 border-b'>
              {/* Timing */}
              <div className='flex-shrink-0 text-gray-700'>{timing}</div>
              {/* Input for Schedule */}
              <input
                type="text"
                placeholder="Add choreography details..."
                className='border border-gray-300 rounded-md p-2 flex-grow'
              />
              {/* Save Button */}
              <button className='bg-green-500 text-white px-4 py-2 rounded-md'>Save</button>
            </div>
          ));
        }
      })}
    </div>
  </div>
  
  )
}

export default AddSchedule