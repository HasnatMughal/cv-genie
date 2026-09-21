'use client'

import { useState } from "react";

export default function ColdMail(){
    const [company, setCompany] = useState('')
    const [purpose, setPurpose] = useState('')
    const [emailBody, setEmailBody] = useState('')
    const [emailSubject, setEmailSubject] = useState('')
    const [loading, setLoading] = useState(false)
    const [copiedBody, setCopiedBody] = useState(false)
    const [copiedSubj, setCopiedSubj] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/cold-email`,
                {
                    method: "POST",
                    body:JSON.stringify({company, purpose})
                }

            )
            if(res.ok){
                const data =  await res.json()
                console.log(data)
                setEmailBody(data.body)
                setEmailSubject(data.subject)
            }
        } catch (error) {
            
        } finally{
            setLoading(false)
        }
    }

    const copySubject = (value:string) => {
       const copying = window.navigator.clipboard.writeText(value)
       setCopiedSubj(true)

    }
    const copyBody = (value:string) => {
       const copying = window.navigator.clipboard.writeText(value)
       setCopiedBody(true)

    }


    return(
        <div className="min-h-screen w-full">
            <h1 className="text-3xl font-semibold text-center">Cold Email Generator</h1>
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex flex-col gap-4 w-full md:w-1/3 md:min-h-screen border border-gray-200 shadow-md items-center h-full self-start">

          
            <form action="" className="flex flex-col justify-center p-4 items-center gap-4" onSubmit={(e) => 
                {
                    e.preventDefault()
                    handleSubmit()
                } 
            }>
                <div>
            <p>Company</p>
            <input type="text" value={company} onChange={(e:any) => setCompany(e.target.value)} className="w-72 border border-gray-200 focus:border-gray-200 p-2" />
                </div>
                <div>
            <p>Purpose of Email</p>
            <textarea name="" value={purpose} onChange={(e:any) => setPurpose(e.target.value)} className="w-72  border border-gray-200 focus:border-gray-200 h-36 p-2 " id=""></textarea>
                </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white w-full py-2">Generate</button>
           </form>
            </div>
            <div className="border border-gray-200 p-4 w-full md:w-2/3 flex gap-4 flex-col md:min-h-screen">
               <h1 className="font-semibold text-xl">Your cold email will appear here.</h1>
                <div className="flex flex-col gap-4 items-start">
                    <div className="flex items-center">
                    <input type="text" placeholder="Email Subject" value={emailSubject} className="w-72 border border-gray-200 focus:border-gray-200 p-2" readOnly />
                         <button className=" bg-blue-500 hover:bg-blue-700  text-white px-4 py-2" onClick={() => copySubject(emailSubject)}>{copiedSubj === false ? "Copy" : "Copied"}</button>
                    </div>
                <textarea name="" value={emailBody} readOnly className="h-92 border p-2 border-gray-200 w-full" id="" placeholder="Email Body"></textarea>
                <button className=" bg-blue-500 hover:bg-blue-700 text-white w-full py-2" onClick={() => copyBody(emailBody)}>{copiedBody === false ? "Copy" : "Copied"}</button>
                </div>
            </div>
            
            </div>
            </div>
    )
}