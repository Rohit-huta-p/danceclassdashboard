import React from 'react'

const Loader = ({loading}) => {
  return (
    <> 
        {loading && (
        <div className='absolute inset-0 flex items-center bg-black/30 justify-center '>
        <dotlottie-player src="https://lottie.host/1572ab5e-e801-48df-96b1-c5f2506bfcdb/kSsbxuy1ti.json"  speed="2" style={{ width: '200px', height: '200px' }} loop autoplay></dotlottie-player>
        </div>
    )} 
    </>
  )
}

export default Loader