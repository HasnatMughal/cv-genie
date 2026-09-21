'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const featureLabels : Record<string, string> = {
     CoverLetter: "Cover Letters",
    ResumeAnalysis: "Resume Analyses",
    jobmatch: "Job Matches",
    linkedin: "LinkedIn Profiles",
    coldmail: "Cold Emails",
}

export default function Feature(){
    const params = useParams();
    const feature = params.feature as string;

    const [items, setItems] = useState<any[]>([])
    console.log(feature)
    const fetchData = async() => {
        try {
            const res = await fetch(`/api/dashboard/user/${feature}`, {
                method: "GET"
            })
            if(res.ok){
                const data =await res.json()
                console.log(data)
                setItems(data)
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchData()
    },[feature])
console.log(featureLabels[feature])
    return(
        <>
        <div className="min-h-screen  w-full flex flex-col items-center">
            <h1 className="text-2xl mb-6 mt-5 font-semibold">{featureLabels[feature] ?? "History"}</h1>

            {items.length === 0 ? <p>Nothing Generated yet.</p> : ""}

            <div className="flex flex-col gap-6">
                {items.map((item) => {
                    return (
                        <div key={item.id}>
                            {feature === "CoverLetter" && (<>
                            <p className="font-semibold">Job Title:{item.jobTitle}</p>
                                    <p className="text-sm text-gray-600 line-clamp-5">
                                       <span className="font-semibold">Content:</span> {item.content}
                                    </p>
                            </>)}
                            {/* Job Match */}
                            {feature === "JobMatcher" && (
                                <>
                                    <p className="font-semibold">{item.JobTitle}</p>
                                    <p className="text-sm text-gray-600">Match Score: {item.matchScore}%</p>
                                </>
                            )}

                            {/* LinkedIn */}
                            {feature === "linkedInOpt" && (
                                <>
                                    <p className="font-semibold">{item.headline}</p>
                                    <p className="text-sm text-gray-600 line-clamp-2">{item.about}</p>
                                </>
                            )}

                            {/* Cold Email */}
                            {feature === "coldMails" && (
                                <>
                                    <p className="font-semibold">{item.subject}</p>
                                    <p className="text-sm text-gray-600 line-clamp-2">{item.body}</p>
                                </>
                            )}

                            <p className="text-xs text-gray-400 mt-1">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </p>
                            
                        </div>
                    )
                })}
            </div>
            
        </div>
        </>
    )
}