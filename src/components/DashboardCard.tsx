'use client'

import React from 'react'
import Link from 'next/link'

type data={
    title:string,
    count:number,
    link:string
}
function DashboardCard({title, count, link}:data) {
  return (
    <div className='flex flex-col justify-center  rounded-2xl shadow-md shadow-gray-500 items-center h-64'>
        <h1 className='font-semibold text-xl'>{title}</h1>
        <p>{count}</p>
        <Link href={link} className='text-blue-500 hover:text-blue-700' >View all</Link>
        
    </div>
  )
}

export default DashboardCard