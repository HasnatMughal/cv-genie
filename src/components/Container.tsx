import React from 'react'

function Container({children}:any) {
  return (
    <div className='mx-auto w-full px-4'>{children}</div>
  )
}

export default Container