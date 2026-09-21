"use client"

import { useState } from "react";

type responseType ={
    matchScore: number,
    matchingSkills: string[],
    missingSkills:string[],
    suggestions:string[]
} 

export default function JobMatcher(){
    const [jobTitle, setJobTitle] = useState('')
    const [description, setDescription] = useState('')
    const [analysis,setAnalysis] = useState<responseType | null>(null)

    const getJobMatch = async () => {
        try {
            const res = await fetch(`/api/JobMatcher`,
                {
                    method:"POST",
                    body:JSON.stringify({jobTitle, description})
                }
            )
            if(res.ok){
                const data = await res.json()
                const analysis = JSON.parse(data.analysis)
                console.log(analysis)
                setAnalysis(analysis)
            }
        } catch (error) {
            console.log(error)
        }
    }

   return(
<div className="min-h-screen w-full">
            <h1 className="text-3xl font-semibold text-center">Job Matcher</h1>
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex flex-col gap-4 w-full md:w-1/3 md:min-h-screen border border-gray-200 shadow-md items-center h-full self-start">

          
            <form action="" className="flex flex-col justify-center p-4 items-center gap-4" onSubmit={(e) => 
                {
                    e.preventDefault()
                    getJobMatch()
                } 
            }>
                <div>
            <p>Job Title</p>
            <input type="text" value={jobTitle} onChange={(e:any) => setJobTitle(e.target.value)} className="w-72 border border-gray-200 focus:border-gray-200 p-2" />
                </div>
                <div>
            <p>Job Description</p>
            <textarea name="" value={description} onChange={(e:any) => setDescription(e.target.value)} className="w-72  border border-gray-200 focus:border-gray-200 h-36 p-2 " id=""></textarea>
                </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white w-full py-2">Submit</button>
           </form>
            </div>
            <div className="border border-gray-200 p-4 w-full md:w-2/3 flex flex-col md:min-h-screen">
               <h1 className="font-semibold text-xl">Your match results will appear here</h1>
               {!analysis ? <p>Paste a job description on the left to see how well your resume matches this role.</p> : ""}
                <div className="flex flex-col gap-4 items-start">
                {analysis?.matchScore  ? <div className="border p-4">
                <p>Match Score:</p>
                {analysis?.matchScore && analysis?.matchScore <= 30 ? <p className="text-red-600">{analysis?.matchScore}</p>: analysis?.matchScore <= 60 ? <p className="text-yellow-600">{analysis?.matchScore}</p> : analysis?.matchScore >= 60 && <p className="text-green-600">{analysis?.matchScore}</p>  }
               </div> : ''}
                    <div className="flex flex-col gap-4 items-start">
                        <div>
                    <h1>
                       {analysis?.matchingSkills ? "Matching Skills" : ""}
                    </h1>
                    <ul>
                        {analysis?.matchingSkills?.map((str, i) => {
                            return(
                                <li key={i}>
                                  {i + 1}. {str}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                    </div>
                        <div>
                    <h1>
                       {analysis?.missingSkills ? "Missing Skills" : ""}
                    </h1>
                    <ul>
                        {analysis?.missingSkills?.map((str, i) => {
                            return(
                                <li key={i}>
                                  {i + 1}. {str}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                    </div>
                
                </div>
            </div>
            </div>
              
   ) 
}