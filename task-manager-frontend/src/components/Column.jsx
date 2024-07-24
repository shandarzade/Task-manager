import React from 'react'

function Column( { children, stage } ) {
  
  return (
    <div className={` flex felx-col flex-wrap w-full rounded-lg m-2 shadow-stone-900 drop-shadow-2xl border `}>
      <div className='flex flex-nowrap  bg-blue-600 w-full m-2 h-10'>
        <h5 className="text-white font-medium leading-tight m-2 max-h-20">{stage}</h5>
      </div>
      <div className='min-h-40 w-full m-2 '>
        {children}
      </div>   
    </div>
  )
}

export default Column