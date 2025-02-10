import Navar from '@/components/Navar/Navar'
import React from 'react'

function layout({children}) {
  return (
    <div className=''>
        <Navar/>
        {children}
    </div>
  )
}

export default layout