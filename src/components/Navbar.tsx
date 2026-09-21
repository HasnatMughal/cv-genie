"use client"

import React, { useState } from 'react'
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

    

    const navItems = [
        { name: "Home", link: "/", icon: FiHome, comingSoon: false },
        { name: "Dashboard", link: "/dashboard", icon: FiGrid, comingSoon: false },
        { name: "Cover Letter", link: "/CoverLetter", icon: FiFileText, comingSoon: false },
        { name: "Resume Analyzer", link: "/ResumeAnalysis", icon: FiSearch, comingSoon: false },
        { name: "Job Matcher", link: "/JobMatcher", icon: FiUsers, comingSoon: false },
        { name: "Interview Preperation", link: "/interViewPrep", icon: FiMic, comingSoon: false },
        { name: "LinkedIn Generator", link: "/LinkedInOpt", icon: FiLinkedin, comingSoon: false },
        { name: "Cold Email Generator", link: "/cold-email", icon: FiMail, comingSoon: false },
        { name: "Settings", link: "/settings", icon: FiSettings, comingSoon: false },
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
                                comingSoon={item.comingSoon}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Navbar