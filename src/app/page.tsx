"use client"

import FeatureCard from "@/components/FeatureCard";
import UpgradeToPro from "@/components/UpgradeToPro";
import Image from "next/image";
import { useEffect, useState } from "react";
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

export default function Home() {
  const [userPlan, setUserPlan] = useState('Free')
  const getUser = async () => {
    const res = await fetch(`/api/user/me`,
      {
        method:"GET"
      }
     
    )
     if(res.ok){
        const data = await res.json()
        setUserPlan(data?.body?.plan)
      }
  }
useEffect(() => {
  getUser()
},[])
const featureItems = [
    {
        name: "Dashboard",
        link: "/dashboard",
        icon: FiGrid,
        description: "Overview of your activity"
    },
    {
        name: "Cover Letter Generator",
        link: "/CoverLetter",
        icon: FiFileText,
        description: "Generate tailored cover letters instantly"
    },
    {
        name: "Resume Analyzer",
        link: "/ResumeAnalysis",
        icon: FiSearch,
        description: "Get AI feedback on your resume"
    },
    {
        name: "Job Matcher",
        link: "/JobMatcher",
        icon: FiUsers,
        description: "Find roles that match your profile"
    },
    {
        name: "Interview Prep",
        link: "/interViewPrep",
        icon: FiMic,
        description: "Practice with AI-generated interview questions"
    },
    {
        name: "LinkedIn Generator",
        link: "/LinkedInOpt",
        icon: FiLinkedin,
        description: "Craft an optimized LinkedIn profile"
    },
    {
        name: "Cold Email Generator",
        link: "/cold-email",
        icon: FiMail,
        description: "Write outreach emails that get replies"
    },
   
]
  return (
    <div className="flex   flex-col flex-1 items-center font-sans ">
      <div className="flex items-center py-4 justify-center gap-8 w-full border-b border-gray-200">
      <p className="flex gap-2 ">Current Plan: {userPlan === "free" ? <p>Free</p> : userPlan === 'paid' && <p>Paid</p>}</p>
      {userPlan === 'free' ? <UpgradeToPro /> : ''}

      </div>
      <div className="md:w-3xl w-92 md:h-36 p-4 rounded-2xl shadow-md mt-5 bg-blue-600 flex items-center justify-center text-white">
        <h1 className="text-3xl  font-semibold">Make your next career move count</h1>
      </div>
      <div className="flex flex-col gap-4 mt-10">
        <h1 className="text-2xl font-semibold">What would you like to work on?</h1>
<div className="grid grid-cols-2 md:grid-cols-4 gap-2  ">
        
        {featureItems.map((item, i) => {
          return(
            <li key={i}>
              <FeatureCard link={item.link} name={item.name} icon={item.icon} description={item.description}/>
            </li>
          )
        })}
      </div>
      </div>
      
    </div>
  );
}
