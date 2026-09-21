"use client"

import { useState } from "react"

export default function CoverLetter(){
    const [jobTitle, setJobTitle] = useState('')
    const [description, setDescription] = useState('')
    const [company, setCompany] = useState('')
    const [coverLetter, setCoverLetter] = useState('')
    const [copied, setCopied] = useState(false)

    const copyCoverLetter = (value:any) => {
      const copying =  navigator.clipboard.writeText(value)
      setCopied(true)
    }

    const getCoverLetter = async () => {
        try {
            const res= await fetch(`/api/CoverLetter`,
                {method:"POST",
                body: JSON.stringify({jobTitle, description, company}) }
            )
            const data = await res.json()
            console.log(data.content)
            setCoverLetter(data.content)
        } catch (error) {
            
        }
    }

    return(
        <>
        
        <div className="min-h-screen w-full">
            <h1 className="text-3xl font-semibold text-center">Cover Letter Generator</h1>
            <div className="flex md:flex-row flex-col items-center justify-between gap-2">
            <div className="flex flex-col gap-4 md:w-1/3 w-full md:min-h-screen border border-gray-200 shadow-md items-center">

          
            <form action="" className="flex flex-col justify-center p-4 items-center gap-4" onSubmit={(e) => 
                {
                    e.preventDefault()
                    getCoverLetter()
                } 
            }>
                <div>
            <p>Job Title</p>
            <input type="text" value={jobTitle} onChange={(e:any) => setJobTitle(e.target.value)} className="w-72 border border-gray-200 p-2" />
                </div>
                <div>
            <p>Company</p>
            <input type="text" value={company} onChange={(e:any) => setCompany(e.target.value)} className="w-72  border border-gray-200   p-2" />
                </div>
                <div>
            <p>Your Background</p>
            <textarea name="" value={description} onChange={(e:any) => setDescription(e.target.value)} className="w-72  border border-gray-200 h-36 p-2 " id=""></textarea>
                </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white w-full py-2">Submit</button>
           </form>
            </div>
            <div className="border border-gray-200 p-4 w-full md:w-2/3 flex flex-col md:min-h-screen">
               <h1 className="font-semibold text-xl"> Your cover letter will appear here</h1>
                <div className="flex flex-col gap-4 items-center">
                <textarea name="" value={coverLetter} readOnly className="h-92 p-2 w-full  border border-gray-200" id="" placeholder="Fill in the job title and your background on the left, and we'll craft a tailored cover letter in seconds."></textarea>
                <button className=" bg-blue-500 hover:bg-blue-700 text-white w-full py-2" onClick={() => copyCoverLetter(coverLetter)}>{copied === false ? "Copy" : "Copied"}</button>
                </div>
            </div>
            </div>
              </div></>
    )
}