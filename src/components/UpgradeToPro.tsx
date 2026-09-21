'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

function UpgradeToPro() {
    const router = useRouter()
    const handleClick = async () => {
        router.push('/UpgradeToPro')
    }
  return (
    <button className=' px-4 py-2 text-white bg-blue-500 hover:bg-blue-700' onClick={handleClick}>Upgrade to Pro</button>
  )
}

export default UpgradeToPro