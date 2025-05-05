import React from 'react'

const Loader = ({loading, isAddBatch}) => {
  return (
    <> 
        {loading && (
        <div className={`absolute ${isAddBatch ? 'top-[-5px] right-0 left-0 ' : 'inset-0 '}  `}>
          <dotlottie-player src="https://lottie.host/1572ab5e-e801-48df-96b1-c5f2506bfcdb/kSsbxuy1ti.json"  speed="2" style={{height: `${isAddBatch ? '70px' : '200px'}` }} loop autoplay></dotlottie-player>
        </div>
    )} 
    </>
  )
}

export default Loader