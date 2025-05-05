import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonAllStudents = () => {
  return (
    <div>
<div class="animate-pulse">
    <div class="rounded-lg p-3 shadow-lg bg-gray-200">

      <div class="relative flex items-center mb-3 text-sm font-medium bg-gray-500">

        <div class="absolute right-0 h-4 w-4 bg-gray-400"></div>

        <div class="h-12 w-12 rounded-full mr-3 bg-gray-400"></div>

        <div class="h-4 w-16 bg-gray-400"></div>
      </div>

      <div class="flex items-center text-[13px] text-gray-800 mb-3">
        <div class="inline-block mr-2 h-4 w-16 bg-gray-400"></div>
        <div class="flex items-center  rounded">
          <div class="text-amber-600 bg-amber-300/30 px-1 text-[12px] h-4 w-24 bg-gray-400"></div>
        </div>
      </div>
      <div class="flex justify-between">
        <div class="flex">

          <div class="mr-2 font-thin text-[9px] bg-blue-100/40 w-fit p-1 rounded-lg h-4 w-8 bg-gray-400"></div>

          <div class="mr-2 font-thin text-[9px] bg-blue-200/40 w-fit p-1 rounded-lg h-4 w-8 bg-gray-400"></div>

          <div class="font-thin text-[9px] bg-blue-200/40 w-fit p-1 rounded-lg h-4 w-8 bg-gray-400"></div>
        </div>

        <div class="flex-col text-end text-sm font-medium">
          <div class="h-4 w-16 bg-gray-400 m-1"></div>
          <div class="inline text-xs font-semibold rounded-lg text-blue-600 hover:text-blue-800 disabled:opacity-50 h-4 w-4 bg-gray-400 m-1"></div>
          <div class="inline text-xs font-semibold rounded-lg text-red-600 hover:text-red-800 disabled:opacity-50 h-4 w-4 bg-gray-400 m-1"></div>
        </div>
      </div>
    </div>
</div>
      
    </div>
  )
}

export default SkeletonAllStudents