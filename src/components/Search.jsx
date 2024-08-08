import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
const Search = ({searchTerm,setsearchTerm}) => {
  return (
    <div className='flex bg-white w-fit p-3 items-center rounded mb-3'>
        <FaMagnifyingGlass size={25} className='p-1'/>
        <input type="search" name="" placeholder='Search' className='ml-2 focus:outline-none' 
                value={searchTerm}
                onChange={(e) => setsearchTerm(e.target.value)}/>
    </div>
  )
}

export default Search