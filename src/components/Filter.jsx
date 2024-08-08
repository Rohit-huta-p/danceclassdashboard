import React from 'react'

const Filter = ({filter ,setFilter}) => {
  return (

    <div className='flex'>
        <p>Component</p>
        <select
        name="filter"
        id="filter"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
        className='bg-transparent text-purple-500 focus:outline-none'
        >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
        </select>
        <select
            name="filter"
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='bg-transparent text-purple-500 focus:outline-none'
            >
            <option value="" disabled>Batch</option>
            <option value="all">All</option>
            <option value="A">A. 6:00 - 7:00pm</option>
            <option value="B">B. 7:00 - 8:00pm</option>
        </select>
    </div>
  )
}

export default Filter