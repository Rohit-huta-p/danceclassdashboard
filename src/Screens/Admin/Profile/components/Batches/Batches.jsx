import React, { useContext, useEffect, useState } from 'react'
import {DollarSign, Plus, Users} from 'lucide-react'
// import Card from './Card'



import {addBatch} from './utils/batchesFunc'

import { GlobalContext } from '../../../../../contexts/GlobalContexts';
import axiosInstance from '../../../../../axiosInstance';

const Batches = () => {
    const {batchTitles, setBatchTitles, batches, setBatches} = useContext(GlobalContext);
    const [showAddBatch, setShowAddBatch] = useState(false);
    const [newBatch, setNewBatch] = useState({
      batchTitle: "",
      timings: "",
      fees: 0
    });

  /**
   * IGNORE the below Function */
  const rcInfo = async () => {
    try {
      const data = await axiosInstance.post('/api/vehicle');
      console.log(data);
      
    } catch (error) {
      console.log(error);
      
    }
  }


  console.log(newBatch);
  
  return (
    <div className='mt-3'>
      
        {/* <button onClick={() => {rcInfo()}}>run</button> */}

        <section className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5" /> Batch Management
              </h2>
             
              {
                !showAddBatch ? (
                  <button
                  className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                  onClick={() => setShowAddBatch(!showAddBatch)}
                >
                  <Plus className="w-4 h-4" /> Add New Batch
                </button>
                ):  (
                  <button
                    className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    onClick={() => setShowAddBatch(!showAddBatch)}
                  >
                    Close
                  </button>
                )
              }
            </div>

            {/* Add Batch Form */}
            {
              showAddBatch && (
                <form className="mb-8 p-6 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="batchTitle" className="block text-sm font-medium text-gray-700">
                      Batch Title
                    </label>
                    <input
                      type="text"
                      id="batchTitle"
                      placeholder="e.g., Kids, Adults"
                      value={newBatch.batchTitle}
                      onChange={(e) => setNewBatch({...newBatch, batchTitle: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="timing" className="block text-sm font-medium text-gray-700">
                      Batch Timing
                    </label>
                    <input
                      type="text"
                      id="timing"
                      placeholder="e.g., 9:00 AM - 10:00 AM"
                      value={newBatch.timings}
                      onChange={(e) => setNewBatch({...newBatch, timings: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="fees" className="block text-sm font-medium text-gray-700">
                      Fees Amount
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="fees"
                        value={newBatch.fees}
                        onChange={(e) => setNewBatch({...newBatch, fees: Number(e.target.value)})}
                        className="block w-full pl-10 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => addBatch(newBatch, setBatches)}
                  >
                    Add Batch
                  </button>
                </div>
              </form>
              )
            }
     

            {/* Batch List */}
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Batch Title</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Timing</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Fees</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {batches.map((batch) => (
                    <tr key={batch.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{batch.batchTitle}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{batch.timings}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${batch.fees}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                        <button className="ml-4 text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
   
    </div>
  )
}

export default Batches