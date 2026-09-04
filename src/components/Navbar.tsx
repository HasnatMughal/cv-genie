"use client"

import React from 'react'
import NavItem from './NavItem'
import {
    FiGrid,
    FiFileText,
    FiSearch,
    FiUsers,
    FiMic,
    FiLinkedin,
    FiMail,
    FiSettings
} from "react-icons/fi";

function Navbar() {
    const navItems = [
    {
        name: "Dashboard",
        link: "/dashboard",
        icon: FiGrid
    },
    {
        name: "Cover Letter",
        link: "/CoverLetter",
        icon: FiFileText
    },
    {
        name: "Resume Analyzer",
        link: "/dashboard/resume-analyzer",
        icon: FiSearch
    },
    {
        name: "Job Matcher",
        link: "/JobMatcher",
        icon: FiUsers
    },
    {
        name: "Interview Prep",
        link: "/interviewPrep",
        icon: FiMic
    },
    {
        name: "LinkedIn Generator",
        link: "/dashboard/linkedin-generator",
        icon: FiLinkedin
    },
    {
        name: "Cold Email Generator",
        link: "/dashboard/cold-email-generator",
        icon: FiMail
    },
    {
        name: "Settings",
        link: "/dashboard/settings",
        icon: FiSettings
    }
]
  return (
    <div className='w-full flex flex-col items-start gap-2'>
        <div className='flex flex-col h-full gap-16 p-4 min-h-screen'>
        <h1 className='text-5xl font-bold'>CV Genie</h1>
            <div>
        {navItems.map((item,index) => {
            return(
                <li key={index}>
                    <NavItem name={item.name} icon={item.icon} link={item.link}/>
                </li>
            )
        })}
        </div>
        </div>
    </div>
  )
}

export default Navbar