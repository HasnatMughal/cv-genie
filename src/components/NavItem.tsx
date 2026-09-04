"use client"

import Link from 'next/link'
import React from 'react'

type data ={
    link:string,
    name:string,
    icon: any
}

function NavItem({link, name, icon}:data) {
    const Icon = icon
  return (
    <Link href={link}  className='w-full p-2 gap-2 flex self-start' ><span><Icon /></span><p>{name}</p></Link>
  )
}

export default NavItem