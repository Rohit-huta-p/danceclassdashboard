import React, { useState } from 'react'

const Filter = ({filter ,setFilter}) => {

    const [selected, setselected] = useState('')

    const handleBatchChange = (batch) => {
        
        setFilter(batch.slice(0,1)); // Directly set the filter state
        
        
        setselected(''); // Reset selected state after selection
    };


    const modalView = (options) => {

        
        return (
        <ul className='font-thin mt-1 rounded divide-y divide-gray-200 absolute left-0 w-[160%] bg-white'>
        { 
            options.map(option => (
                    <button onClick={() => handleBatchChange(option)} className='w-full'>
                        <li>{option.slice(0)}</li>
                    </button>
            ))
        }
        </ul>
        )
    }

    
  return (

    <div className='flex'>

        {/* Batch */}
        <div className='relative mr-3'>
            <div className=''>
            <button className={`flex  px-2 py-1 ${selected ==='batch' ? 'bg-gray-200' : "bg-white"}`} onClick={() => selected === 'batch' ? setselected('') : setselected('batch')} >
                <p>Batch</p>
          
                {
                    selected === 'batch' ? (
                        <svg className="rotate-180" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                            viewBox="0 0 24 24">
                            <path fill="currentColor"
                            d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z" />
                        </svg>
                    ) :(
                        <svg className="rotate-90" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                            viewBox="0 0 24 24">
                            <path fill="currentColor"
                            d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z" />
                        </svg>
                    )
                }
            </button>
            </div>
            {
                selected === 'batch' && (
                   modalView(['All', 'A. 6:00pm - 7:00pm', 'B. 7:00pm - 8:00pm'])
                )
            }
        </div>
        {/* Fee Status */}
        <div className='relative'>
            <button className=' bg-white px-2 py-1' onClick={() => setselected('feeStatus')}>Fee Status</button>
            {
                selected === 'feeStatus' && (
                    <ul className='font-thin divide-y divide-gray-200 absolute w-[160%] bg-white'>
                    <button onClick={() => handleBatchChange('all')} className='w-full'>
                    <li>All</li>
                    </button>
                    <button onClick={() => handleBatchChange('pending')} className='w-full'>
                    <li>pending</li>
                    </button>
                    <button onClick={() => handleBatchChange('paid')} className='w-full'>
                    <li>paid</li>
                    </button>
                </ul>
                )
            }
        </div>
       
    </div>
  )
}

export default Filter