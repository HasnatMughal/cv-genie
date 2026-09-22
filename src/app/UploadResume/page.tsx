"use client"

import ResumeUploadCard from "@/components/ResumeUploadCard"
import { useEffect, useState } from "react"

export default function UploadResume(){
    
    return(
        <div className="flex flex-col bg-gray-500 justify-center min-h-screen items-center">
            
            <ResumeUploadCard />

         
        </div>
    )
}