'use client'

import DashboardCard from "@/components/DashboardCard";
import { useEffect, useState } from "react";

type data = {
    coverLetters: any[];
    resumes: any[]; 
    jobMatches: any[];
    interviewPrep: any[];
    linkedInOpt: any[];
    coldMails: any[];
    name:string

}
export default function Dashboard(){
    const [userData, setUserData] = useState<data |null>(null)
    const [loading, setLoading] = useState(false)
   const getUserData = async() => {
    setLoading(true)
     try {
        const res = await fetch(`/api/dashboard`,
            {
                method:'GET'
            }
        )
        if(res.ok){
            const data = await res.json()
            console.log(data)
            setUserData(data)
        }
    } catch (error) {
        
    }
    finally{
        setLoading(false)
    }
   }



   useEffect(() => {
    getUserData()
   },[])


   const stats = [
    {
        name:"Cover Letters",
        data:userData?.coverLetters,
        link:`/dashboard/user/CoverLetter`
    },
    {
        name:"Resume Analysis",
        data:userData?.resumes,
        link:`/dashboard/user/ResumeAnalysis`
    },
    {
        name:"Job Matches",
        data:userData?.jobMatches,
        link:`/dashboard/user/JobMatcher`
    },
    {
        name:"Cold Emails",
        data:userData?.coldMails,
        link:`/dashboard/user/coldMails`
    },
    {
        name:"LinkedIn History",
        data:userData?.linkedInOpt,
        link:`/dashboard/user/linkedInOpt`
    },
   ]

   return(
    <>
    <div className="min-h-screen w-full">

        <h1 className="text-3xl font-semibold text-center">{userData?.name} Dashboard</h1>
        <div className="mt-5 ">
            <h1 className="text-xl text-center font-semibold">Your Stats</h1>
 <div className="grid grid-cols-3 gap-4">
            {loading ? <p>Loading...</p> : stats && stats.map((stat, i) => {
                return(
                    <li key={i}>
                        <DashboardCard count={Number(stat.data?.length)} link={stat.link} title={stat.name} />
                    </li>
                )
            })}
        </div>
        </div>
       
    </div>
    </>
   )
}