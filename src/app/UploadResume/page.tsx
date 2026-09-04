"use client"

import ResumeUploadCard from "@/components/ResumeUploadCard"
import { useEffect, useState } from "react"

export default function UploadResume(){
    // const [userStatus, setUserStatus] = useState('')
    // const getUserResume = async() => {
    //     try {
    //         const userRes = await fetch(`/api/user/me`, 
    //             {method:"GET"
    //             }
    //         )
    //         console.log(userRes)
    //         if(userRes.ok){
    //             const data = await userRes.json()
    //             console.log(data.body)
    //         }
    //     } catch (error) {
            
    //     }
    // }
    // useEffect(() => {getUserResume()},[])
    return(
        <div className="flex flex-col bg-gray-500 justify-center min-h-screen items-center">
            
            <ResumeUploadCard />

         
        </div>
    )
}