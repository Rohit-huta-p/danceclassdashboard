import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../../../../axiosInstance'
import Card from './Card'
import { GlobalContext } from '../../../../contexts/GlobalContexts'

const Batches = () => {
    const {ageGroups, setageGroups} = useContext(GlobalContext);
    const [batchTimings, setBatchTimings] = useState([])

    

const rcInfo = async () => {
   try {
    const data = await axiosInstance.post('/api/vehicle');
    console.log(data);
    
   } catch (error) {
    console.log(error);
    
   }
}

  return (
    <div className='mt-3'>
        {/* <button onClick={() => rcInfo()}>run</button> */}
        {
            <Card ageGroups={ageGroups} setageGroups={setageGroups}   />
        }
  
    </div>
  )
}

export default Batches