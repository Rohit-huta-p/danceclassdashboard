import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useSelector } from 'react-redux';


export const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
  const [batches, setBatches] = useState([])
  const { isLogin } = useSelector((state) => state.user); // Check if the user is logged in

  const fetchAgeGroup = async () => {
    const response = await axiosInstance.get('/api/user/fetchagegroups')

    
    setBatches(response.data);
  }


  useEffect(() => {
    if(isLogin){
      fetchAgeGroup()
    }
  }, [])
  

  return (
    <GlobalContext.Provider value={{ batches }}>
      {children}
    </GlobalContext.Provider>
  );
};