"use client"

import React, { useEffect, useState } from 'react'
import NavItem from './NavItem'
import { usePathname } from 'next/navigation';
import {
    FiGrid,
    FiFileText,
    FiSearch,
    FiUsers,
    FiMic,
    FiLinkedin,
    FiMail,
    FiSettings,
    FiHome,
    FiMenu,
    FiX
} from "react-icons/fi";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const [userPlan , setUserPlan] = useState('')

    const getUser = async () => {
        
       try {
         const res = await fetch(`/api/user/me`,
          {
            method:"GET"
          }
         
        )
         if(res.ok){
            const data = await res.json()
            console.log("Nav" ,data)
            setUserPlan(data?.body?.plan)
          }
       } catch (error) {
        
       }
      }

    useEffect(() => {
      getUser()
    },[])

    

    const navItems = [
        { name: "Home", link: "/", icon: FiHome, comingSoon: false },
        { name: "Dashboard", link: "/dashboard", icon: FiGrid, available:  true  },
        { name: "Cover Letter", link:  "/CoverLetter" , icon: FiFileText, available: true },
        { name: "Resume Analyzer", link: userPlan === "paid" ? "/ResumeAnalysis" : 'UpgradeToPro', icon: FiSearch, available: userPlan === "paid" ? true : false },
        { name: "Job Matcher", link:   userPlan === "paid" ? "/JobMatcher" : 'UpgradeToPro', icon: FiUsers, available: userPlan === "paid" ? true : false  },
        { name: "Interview Preperation", link:  userPlan === "paid" ? "/interViewPrep" : 'UpgradeToPro', icon: FiMic, available: userPlan === "paid" ? true : false  },
        { name: "LinkedIn Generator", link:  userPlan === "paid" ? "/LinkedInOpt" : 'UpgradeToPro', icon: FiLinkedin, available: userPlan === "paid" ? true : false  },
        { name: "Cold Email Generator", link: userPlan === "paid" ? "/cold-email" : 'UpgradeToPro', icon: FiMail, available: userPlan === "paid" ? true : false  },
        { name: "Settings", link: "/settings", icon: FiSettings, available: true },
    ]

    if(pathname === "/login" || pathname === '/signup'){
        return null
    }

    return (
        <>
           
            <div className='md:hidden flex items-center justify-between p-4 border-b'>
                <h1 className='text-2xl font-bold'>CV Genie</h1>
                <button onClick={() => setIsOpen(true)} aria-label="Open menu">
                    <FiMenu size={26} />
                </button>
            </div>

           
            {isOpen && (
                <div
                    className='fixed inset-0 bg-black/40 z-40 md:hidden'
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div
                className={`
                    fixed md:static top-0 left-0 h-full z-50
                    bg-white flex flex-col gap-16 p-4 min-h-screen w-64
                    transform transition-transform duration-300
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                `}
            >
                <div className='flex items-center justify-between'>
                    <h1 className='text-3xl md:text-5xl font-bold'>CV Genie</h1>
                    <button className='md:hidden' onClick={() => setIsOpen(false)} aria-label="Close menu">
                        <FiX size={24} />
                    </button>
                </div>

                <ul className='flex static flex-col gap-2'>
                    {navItems.map((item, index) => (
                        <li key={index} onClick={() => setIsOpen(false)}>
                            <NavItem
                                name={item.name}
                                icon={item.icon}
                                link={item.link}
                                available={item.available as boolean}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Navbar