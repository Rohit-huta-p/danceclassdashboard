import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../../axiosInstance'
import Card from './Card'


import axios from 'axios';

const Batches = () => {
    const [allAgeGroups, setAllAgeGroups] = useState([])
    const [batchTimings, setBatchTimings] = useState([])


const rcInfo = async () => {
   try {
    const data = await axiosInstance.get('/api/vehicle');
    console.log(data);
    
   } catch (error) {
    console.log(error);
    
   }
}

    const fetchAgeGroups = async () => {
        try {
            const response = await axiosInstance.get('/api/user/fetchagegroups')
            const data = response.data
            setAllAgeGroups(data.ageGroups)
            setBatchTimings(data.batchTimings)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchAgeGroups(); 
    }, []); 
  return (
    <div className='mt-3'>
        {/* <button onClick={() => rcInfo()}>run</button> */}
        {
            <Card allAgeGroups={allAgeGroups} setAllAgeGroups={setAllAgeGroups} batchTimings={batchTimings} setBatchTimings={setBatchTimings} fetchAgeGroups={fetchAgeGroups} />
        }
  
    </div>
  )
}

export default Batches