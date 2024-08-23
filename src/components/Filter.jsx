import React, { useState } from 'react'
import { FaDownload } from "react-icons/fa6";

const Filter = ({filter ,setFilter}) => {

    const [selected, setselected] = useState('')
    console.log(selected);
    
    const handleFilterChange = (field, optionSelected) => {
        if(field === 'batch'){
            setFilter(optionSelected.slice(0,1));
            
        }else{
        
            
            setFilter(optionSelected)
        }
        setselected(''); // Reset selected state after selection
    };


    const modalView = ( selected ,options) => {
       
        
        if(selected === 'batch'){
                return (
                    <div className=''>
                        <ul className='z-40 bg-slate-600 text-white font-thin mt-1 rounded divide-y divide-gray-200 absolute left-0 w-[200%]'>
                        { 
                            options.map(option => (
                                    <button onClick={() => handleFilterChange('batch' ,option)} className='w-full'>
                                        <li>{option.slice(0)}</li>
                                    </button>
                            ))
                        }
                        </ul>
                    </div>
                )
        }else if(selected === 'feeStatus'){
            return (
                <ul className='z-40 bg-slate-600 text-white font-thin mt-1 rounded divide-y divide-gray-200 absolute left-0 top-[100%] w-[140%]  md:right-1'>
                { 
                    options.map(option => (
                            <button onClick={() => handleFilterChange('feeStatus' ,option)} className='w-full'>
                                <li>{option}</li>
                            </button>
                    ))
                }
                </ul>
                )
        }
    }


    
  return (

    <div className='flex md:flex md:flex-col md:items-end'>

        {/* Batch */}
        <div className='relative mr-3 md:mb-2'>

            <button className={`flex  px-2 py-1 ${selected ==='batch' ? 'bg-gray-200' : "bg-white"}`} onClick={() => selected === 'batch' ? setselected('') : setselected('batch')} >
                <p className='font-light text-sm'>Batch</p>
          
                {
                    selected === 'batch' ? (
                        <svg className="rotate-180" xmlns="http://www.w3.org/2000/svg" width='20' height="20"
                            viewBox="0 0 24 24">
                            <path fill="currentColor"
                            d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z" />
                        </svg>
                    ) :(
                        <svg className="rotate-90" xmlns="http://www.w3.org/2000/svg" width='20' height="20"
                            viewBox="0 0 24 24">
                            <path fill="currentColor"
                            d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z" />
                        </svg>
                    )
                }
            </button>
      
            {
                selected === 'batch' && (
                   modalView(selected,['All', 'A. 6:00pm - 7:00pm', 'B. 7:00pm - 8:00pm'])
                )
            }
        </div>
        {/* Fee Status */}
        <div className='relative mr-3'>
            <button  className={`flex  px-2 py-1 ${selected ==='feeStatus' ? 'bg-gray-200' : "bg-white"}`} onClick={() => selected === 'feeStatus' ? setselected('') :setselected('feeStatus')}>
                <p className='font-light text-sm'>Fee Status</p>
                {
                        selected === 'batch' ? (
                            <svg className="rotate-180" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                viewBox="0 0 24 24">
                                <path fill="currentColor"
                                d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z" />
                            </svg>
                        ) :(
                            <svg className="rotate-90" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                viewBox="0 0 24 24">
                                <path fill="currentColor"
                                d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z" />
                            </svg>
                        )
                }
                
                {
                    selected === 'feeStatus' && (
                        modalView(selected,['all', 'pending', 'paid'])
                    )
                }
           </button>

        </div>
       
    </div>
  )
}

export default Filter