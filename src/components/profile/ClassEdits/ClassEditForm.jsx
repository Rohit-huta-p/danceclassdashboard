import React, { useEffect, useState } from 'react'

import axiosInstance from '../../../axiosInstance'
import Batches from './Batches/Batches'


const ClassEditForm = () => {
    const fields = ['Batches']
    const [selected, setSelected] = useState('Batches')
   

    const renderField = () => {
        switch (selected) {
            case 'Batches':
                return 
        }
    }
    
  return (
    <div className=''>
        <h1 className='text-center p-2 bg-gray-200'>Batches</h1>
        <Batches />
    </div>
  )
}

export default ClassEditForm