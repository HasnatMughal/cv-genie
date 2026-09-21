"use client"

import Link from 'next/link'
import React from 'react'

type data ={
    link:string,
    name:string,
    icon: any,
    comingSoon:boolean
}

function NavItem({link, name, icon, comingSoon}:data) {
    const Icon = icon
  return (
    <Link href={link}  className='w-full p-2 gap-2 flex items-center self-start' ><span className='md:block hidden'><Icon /></span><p>{name}</p>{comingSoon === true ? <span className=' flex self-center border px-1 extraSmallText '>Coming soon</span>: ""}</Link>
  )
}

export default NavItem