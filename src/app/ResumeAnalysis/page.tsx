"use client"

import ResumeuploadButton from "@/components/ResumeuploadButton"
import ResumeUploadCard from "@/components/ResumeUploadCard"
import useGetUserPlan from "@/hooks/useGetUserPlan";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

type FeedbackType = {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
    missingKeywords: string[];
};

export default function ResumeAnalysis(){

 
    const [analysis, setAnalysis] = useState('')
    const [resume, setResume] = useState('')
    const [loading, setLoading] = useState(false)
    const [parsedFeedback, setParsedFeedback] = useState <FeedbackType| null>(null)
    const [score, setScore] = useState(0)

    const { data: session, status } = useSession()
    const router = useRouter()

    
    const userPlan = useGetUserPlan()

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        }
        if(!userPlan.checking && userPlan.userPlan === 'free'){
            router.push('/UpgradeToPro')
        }
    }, [status, router, userPlan.userPlan])

    const getMyResume = async() => {
        setLoading(true)
        try {
            const res = await fetch(`/api/user/me`,{
                method: "GET",

            })
            const data = await res.json()
           setResume(data.body.resume)

        } catch (error) {
            
        } finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        getMyResume()
    }, [])
    const getAnalysis = async() => {
        try {
            const res = await fetch(`/api/ResumeAnalyzer`,
                {
                    method:"POST",
                    
                }
            )
            if(res.ok){
                const data = await res.json()
                console.log(data)
                setParsedFeedback(JSON.parse(data.feedback) as FeedbackType)
                setScore(data.score)
            }

        } catch (error) {
            
        }
    }

    

    if (status === "loading") return <div>Loading...</div>
    if (!session) return null

    
    
    return(
        <>
        <div className="min-h-screen w-full">
            <h1 className="text-3xl font-semibold text-center">Analyze Your Resume</h1>
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex flex-col p-4 gap-4 w-full md:w-1/3 md:min-h-screen h-full self-start border border-gray-200 shadow-md items-center">
            <h1 className="text-2xl font-semibold">Send Your Resume</h1>
          {loading ? <p>Looking for your resume...</p> : resume ? <div className=" flex flex-col items-center gap-4 justify-center ">
            <p className="text-sm">We have your resume, Just click the button below and get a detailed analysis of your resume.</p>
            <button className=" bg-blue-500 hover:bg-blue-700 text-white py-2 px-4" onClick={() => getAnalysis()}>Get Analysis</button>
          </div> : <div>
            <p className="text-sm">Looks like you have not uploaded your resume, Click the button below and upload your resume.</p>
            <ResumeuploadButton />
            </div>}
            </div>
            <div className="border border-gray-200 p-4 w-full md:w-2/3 flex flex-col md:min-h-screen">
               <h1 className="font-semibold text-xl">Your resume analysis will appear here</h1>
               {!analysis ? <p>Click "Get Analysis" to see your ATS score, strengths, and areas to improve.</p> : ""}
               {score ? <div className="border p-4">
                <p>Your ATS score:</p>
                {score && score <= 30 ? <p className="text-red-600">{score}</p>: score <= 60 ? <p className="text-yellow-600">{score}</p> : score >= 60 && <p className="text-green-600">{score}</p>  }
               </div> : ''}
                <div className="flex flex-col gap-4 items-start">
                <div>
                    <h1>
                       {parsedFeedback?.strengths ? "Strengths" : ""}
                    </h1>
                    <ul>
                        {parsedFeedback?.strengths?.map((str, i) => {
                            return(
                                <li key={i}>
                                  {i + 1}. {str}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <h1>
                       {parsedFeedback?.strengths ? "Weaknesses" : ""}
                    </h1>
                    <ul>
                        {parsedFeedback?.weaknesses?.map((str, i) => {
                            return(
                                <li key={i}>
                                  {i + 1}. {str}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <h1>
                        {parsedFeedback?.strengths ? "Suggestions" : ""}
                    </h1>
                    <ul>
                        {parsedFeedback?.suggestions?.map((str, i) => {
                            return(
                                <li key={i}>
                                  {i + 1}. {str}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <h1>
                        {parsedFeedback?.strengths ? "Missing Keywords" : ""}
                    </h1>
                    <ul className="grid grid-cols-4">
                        {parsedFeedback?.missingKeywords?.map((str, i) => {
                            return(
                                <li className="border px-2 text-center py-2" key={i}>
                                   {str}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                
                </div>
            </div>
            
              </div>
              </div></>
    )
}