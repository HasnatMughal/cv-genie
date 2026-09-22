"use client"

import Link from 'next/link'
import React from 'react'
import {FiLock}  from "react-icons/fi"

type data ={
    link:string,
    name:string,
    icon: any,
    available:boolean
}

function NavItem({link, name, icon, available}:data) {
    const Icon = icon
  return (
    <Link href={link}  className='w-full p-2 gap-2 flex items-center self-start' ><span className='md:block hidden'><Icon /></span><p>{name}</p>{available === false ? <span className=' flex   px-1 extraSmallText  '><FiLock className='text-sm border-none'/></span>: ""}</Link>
  )
}

export default NavItem