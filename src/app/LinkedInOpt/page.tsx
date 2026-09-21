"use client"

import ResumeuploadButton from "@/components/ResumeuploadButton"
import ResumeUploadCard from "@/components/ResumeUploadCard"
import { useEffect, useState } from "react"

type FeedbackType = {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
    missingKeywords: string[];
};

export default function LinkedInOpt(){
    const [resume, setResume] = useState('')
    const [loading, setLoading] = useState(false)
    const [headline, setHeadline] = useState('')
    const [about, setAbout] = useState('')
    const [copiedAbout ,setCopiedAbout] = useState(false) 
    const [copiedHeadline ,setCopiedHeadline] = useState(false) 
    const [data, setData] = useState('')


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
            const res = await fetch(`/api/linkedInGenerator`,
                {
                    method:"POST",
                    
                }
            )
            if(res.ok){
                const data = await res.json()
                setAbout(data.about)
                setHeadline(data.headline)
                setData(data)
            }

        } catch (error) {
            
        }
    }
     const copyAbout = (value:string) => {
       const copying = window.navigator.clipboard.writeText(value)
       setCopiedAbout(true)

    }
    const copyHeadline = (value:string) => {
       const copying = window.navigator.clipboard.writeText(value)
       setCopiedHeadline(true)

    }
    
    
    return(
        <>
        <div className="min-h-screen w-full">
            <h1 className="text-3xl font-semibold text-center">Analyze Your Resume</h1>
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex flex-col p-4 gap-4 w-full md:w-1/3 md:min-h-screen h-full self-start border border-gray-200 shadow-md items-center">
            <h1 className="text-2xl font-semibold">Send Your Resume</h1>
          {loading ? <p>Looking for your resume...</p> : resume ? <div className=" flex flex-col items-center gap-4 justify-center ">
            <p className="text-sm">We have your resume, Just click the button below and we will write a tailored headline and about for your linkeddIn profile.</p>
            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2" onClick={() => getAnalysis()}>Generate</button>
          </div> : <div>
            <p className="text-sm">Looks like you have not uploaded your resume, Click the button below and upload your resume.</p>
            <ResumeuploadButton />
            </div>}
            </div>
            <div className="border border-gray-200 p-4 w-full  md:w-2/3 flex gap-4 flex-col md:min-h-screen">
               <h1 className="font-semibold text-xl">Your LinkedIn profile will appear here.</h1>
               {!data ? <p>"Generate" to get an AI-optimized headline and About section based on your resume.</p> : ''}
                <div className="flex flex-col gap-4 items-start">

                    <div className="flex items-center">
                    <input type="text" value={headline} className="w-72 border border-gray-200 focus:border-gray-200 p-2" readOnly />
                         <button className=" bg-blue-500 hover:bg-blue-700  text-white px-4 py-2" onClick={() => copyHeadline(headline)}>{copiedHeadline === false ? "Copy" : "Copied"}</button>
                    </div>
                <textarea name="" value={about} readOnly className="h-92 border border-gray-200 w-full" id=""></textarea>
                <button className=" bg-blue-500 hover:bg-blue-700 text-white w-full py-2" onClick={() => copyAbout(about)}>{copiedAbout === false ? "Copy" : "Copied"}</button>
                </div>
            </div>
            
            
              </div>
              </div></>
    )
}