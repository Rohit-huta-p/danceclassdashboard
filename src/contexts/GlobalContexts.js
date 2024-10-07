import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useSelector } from 'react-redux';


export const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
  const [batches, setBatches] = useState([])
  const [ageGroups, setageGroups] = useState([])

  const { isLogin } = useSelector((state) => state.user); // Check if the user is logged in

  const fetchBatches = async () => {
    try {
      const response = await axiosInstance.get('/api/user/fetchbatches')
      const fetchedAgeGroups = response.data.batches.map(batch => batch.ageGroup)
      setageGroups(fetchedAgeGroups);
      setBatches(response.data.batches);
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
    <GlobalContext.Provider value={{ batches, setBatches, ageGroups, setageGroups }}>
      {children}
    </GlobalContext.Provider>
  );
};