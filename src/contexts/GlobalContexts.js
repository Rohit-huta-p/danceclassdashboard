import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useSelector } from 'react-redux';


export const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [batches, setBatches] = useState([])

  const [batchTitles, setBatchTitles] = useState([])
  const [isBatchesLoading, setisBatchesLoading] = useState(false)

  const { isLogin } = useSelector((state) => state.user); // Check if the user is logged in

  const fetchBatches = async () => {
    setisBatchesLoading(true);
    try {
      const response = await axiosInstance.get('/api/user/fetchbatches')
      const fetchedBatchNames = response.data.batches.map(batch => batch.batchName)
      // setting batches
      setBatches(response.data.batches);
      // setting Batch Names
      setBatchTitles(fetchedBatchNames);

      setisBatchesLoading(false)
    } catch (error) {
      console.log(error);
    }
  }



  

  useEffect(() => {
    if(isLogin){
      fetchBatches()
    }
  }, [isLogin])
  

  return (
    <GlobalContext.Provider value={{
           batches, setBatches,
           batchTitles, setBatchTitles, 
           isBatchesLoading, 
           isLoading, setIsLoading }}>
      {children}
    </GlobalContext.Provider>
  );
};