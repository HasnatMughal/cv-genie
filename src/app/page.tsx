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
  const [loading, setLoading] = useState(false)
  const getUser = async () => {
    setLoading(true)
   try {
     const res = await fetch(`/api/user/me`,
      {
        method:"GET"
      }
     
    )
     if(res.ok){
        const data = await res.json()
        setUserPlan(data?.body?.plan)
      }
   } catch (error) {
    
   }finally{
    setLoading(false)
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
        description: "Overview of your activity",
        available:true
    },
    {
        name: "Cover Letter Generator",
        link: "/CoverLetter",
        icon: FiFileText,
        description: "Generate tailored cover letters instantly",
        available:  true
    },
    {
        name: "Resume Analyzer",
        link: userPlan === 'paid' || "lifetime" ? "/ResumeAnalysis" : "/UpgradeToPro",
        icon: FiSearch,
        description: "Get AI feedback on your resume",
        available: userPlan === "paid" || "lifetime" ? true : false
    },
    {
        name: "Job Matcher",
        link: userPlan === 'paid' || "lifetime" ? "/JobMatcher" : "/UpgradeToPro",
        icon: FiUsers,
        description: "Find roles that match your profile",
        available: userPlan === "paid" || "lifetime" ? true : false
    },
    {
        name: "Interview Prep",
        link:userPlan === 'paid' || "lifetime" ? "/interViewPrep" : "/UpgradeToPro",
        icon: FiMic,
        description: "Practice with AI-generated interview questions",
        available: userPlan === "paid" || "lifetime" ? true : false
    },
    {
        name: "LinkedIn Generator",
        link:userPlan === 'paid' || "lifetime" ? "/linkedInOpt" : "/UpgradeToPro",
        icon: FiLinkedin,
        description: "Craft an optimized LinkedIn profile",
        available: userPlan === "paid" || "lifetime" ? true : false
    },
    {
        name: "Cold Email Generator",
        link: userPlan === 'paid' || "lifetime" ? "/cold-email" : "/UpgradeToPro",
        icon: FiMail,
        description: "Write outreach emails that get replies",
        available: userPlan === "paid" || "lifetime" ? true : false
    },
   
]
  return (
    <div className="flex   flex-col flex-1 items-center font-sans ">
      <div className="flex items-center py-4 justify-center gap-8 w-full border-b border-gray-200">
      <p className="flex gap-2 ">Current Plan: {loading === true ? <span>Loading...</span> : userPlan === "free" ? <span>Free</span> : userPlan === 'paid' ? <span>Paid</span>  : userPlan === 'lifetime' && <span>Lifetime</span>}</p>
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
              <FeatureCard link={item.link} name={item.name} icon={item.icon} description={item.description} available={item.available}/>
            </li>
          )
        })}
      </div>
      </div>
      
    </div>
  );
}
