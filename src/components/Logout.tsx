"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

function Logout() {
    const handleLogout = async() => {
        try {
            const result = await signOut({callbackUrl:'/login'})
        } catch (error) {
            
        }
    }

  return (
    <button className='px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-xl' onClick={handleLogout}>Logout</button>
  )
}

export default Logout