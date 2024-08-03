import React, { createContext, useState } from 'react';


export const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
  const batches = {
    A : '6:00pm - 7:00pm',
    B: "7:00pm - 8:00pm"
  }
  return (
    <GlobalContext.Provider value={{ batches }}>
      {children}
    </GlobalContext.Provider>
  );
};