"use client"

import FeatureCard from "@/components/FeatureCard";
import Image from "next/image";
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
  

const featureItems = [
    {
        name: "Dashboard",
        link: "/dashboard",
        icon: FiGrid,
        description: "Overview of your activity"
    },
    {
        name: "Cover Letter Generator",
        link: "/dashboard/coverletter",
        icon: FiFileText,
        description: "Generate tailored cover letters instantly"
    },
    {
        name: "Resume Analyzer",
        link: "/dashboard/resume-analyzer",
        icon: FiSearch,
        description: "Get AI feedback on your resume"
    },
    {
        name: "Job Matcher",
        link: "/dashboard/job-matcher",
        icon: FiUsers,
        description: "Find roles that match your profile"
    },
    {
        name: "Interview Prep",
        link: "/dashboard/interview-prep",
        icon: FiMic,
        description: "Practice with AI-generated interview questions"
    },
    {
        name: "LinkedIn Generator",
        link: "/dashboard/linkedin-generator",
        icon: FiLinkedin,
        description: "Craft an optimized LinkedIn profile"
    },
    {
        name: "Cold Email Generator",
        link: "/dashboard/cold-email-generator",
        icon: FiMail,
        description: "Write outreach emails that get replies"
    },
   
]
  return (
    <div className="flex flex-col flex-1 items-center font-sans ">
      <div className="w-3xl h-36 p-4 rounded-2xl shadow-md mt-5 bg-blue-600 flex items-center justify-center text-white">
        <h1 className="text-3xl  font-semibold">Make your next career move count</h1>
      </div>
      <div className="flex flex-col gap-4 mt-10">
        <h1 className="text-2xl font-semibold">What would you like to work on?</h1>
<div className="grid grid-cols-4 gap-2  ">
        
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
