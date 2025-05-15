import React from 'react'

const FeeReceipt = () => {
  return (
    <div className="p-8 w-4/6 mt-14 bg-gray-200">
    <div className="flex justify-between items-start">
      <div>
        <h1 className="font-bold text-2xl">Invoice</h1>
        <h1 className='text-gray-500 font-bold'>Invoice Number #INV-123456789-000</h1>
      </div>

      <div>
        <img src="" alt="logo" className="w-20 h-auto" />
      </div>
    </div>

      <div className='bg-gray-300 w-full h-[1px]'></div>

    <hr className="my-4" />

    <div>
      <h1>Name:</h1>
      <h1>Batch:</h1>
      <h1>Contact Number:</h1>
    </div>

    <hr className="my-4" />

    <div className="flex justify-between">
      <div>

        <div className="mb-6">
          <h1 className='text-gray-500 font-bold'>Billed By:</h1>
          <h1 className='font-bold'>Rohit Production</h1>
          <p>111/Enterprice Avenue Floor 2, Pune</p>
        </div>


        <div className='flex py-3'>
          <h1 className='text-gray-500 font-bold'>Date Issued:</h1>
          <h1>January</h1>
          <h1>17/2025</h1>
        </div>
      </div>

      <div>

        <div className='mb-6'>
          <h1 className='text-gray-500 font-bold'>Billed To:</h1>
          <h1 className='font-bold'>Rohit Huta</h1>
          <p>111/Enterprice Avenue Floor 2, Pune</p>
        </div>


        <div className='flex py-3'>
          <h1 className='text-gray-500 font-bold'>Due Date:</h1>
          <h1>January</h1>
          <h1>31/2025</h1>
        </div>
      </div>

    </div>

    <hr />

    <div>
      <div>
        <h1 className='text-gray-500 font-bold' >Invoice Details</h1>
      </div>
      <div>
        <h1>Name:Onkar jamdade</h1>
        <h1>Month:6mnt</h1>
        <h1>Price:7,000</h1>

      </div>


    </div>
    <hr />

    <div>
      <div>
        <h1>Total:7,000</h1>
        <h1>Pending:2,000</h1>
        <h1>Tax:600</h1>
        <h1>Discount:10%</h1>
        <h1 className='font-bold'>Grand Taotal:7,000</h1>

      </div>
    </div>


    <br />
    <div>

      <div className="bg-gray-100 p-4 rounded-xl">
        <h1 className="font-bold mb-2">Notes</h1>
        <ul className="list-disc pl-5">
          <li className='text-gray-500'>Payment is due by January 31, 2025</li>
          <li className='text-gray-500'>Include the invoice number in the payment reference to ensure accurate processing</li>
        </ul>
      </div>

      <div>
        <div className="flex justify-between items-start my-2">
          <h1>Kulture Dance Studio, IND</h1>
          <h2 className='text-gray-500 font-bold'>(+91)9673390378</h2>
        </div>
      </div>
    </div>
  </div>

  )
}

export default FeeReceipt