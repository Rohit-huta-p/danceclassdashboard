import React, { useEffect, useState } from 'react'
import icon from '../assets/icon.png'
const Intro = () => {
    const [animateFade, setanimateFade] = useState('opacity-0')
    useEffect(() => {
      setTimeout(() => {
        setanimateFade('animate-fade')
      }, 1500)
      
    }, [])
    
  return (
    <div className='relative bg-slate-900 text-white flex justify-center items-center'>
        <img src={icon}alt="fdf" className='z-10 w-[30%]'/>
        <div className='md:flex md:flex-col items-center'>
            <p className='text-3xl animate-slide'>Studio Flowie</p>
            <p className={`font-thin text-sm  ${animateFade}`}>Management made easy</p>
        </div>
    </div>
  )
}

export default Intro