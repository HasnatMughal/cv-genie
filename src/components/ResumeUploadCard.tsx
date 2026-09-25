"use client"

import { UploadButton } from '@/lib/uploadthing'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FiCheckCircle } from 'react-icons/fi'

function ResumeUploadCard() {
    const [resumeFile, setResumeFile] = useState('')
    const router = useRouter()
    const [viewSuccessMessage, setViewSuccessMessage] = useState(false)

    const uploadResume = async (resume:String) => {
        try {
            const uploadRes = await fetch(`/api/user/me`, 
               { method:"PATCH",
                body:JSON.stringify({resume:resume})
                }
            )
            if(uploadRes.ok){
                router.refresh()
            }
        } catch (error) {
            
        } finally{
            setViewSuccessMessage(true)
        }
    }
     const [userStatus, setUserStatus] = useState('')
        const getUserResume = async() => {
            try {
                const userRes = await fetch(`/api/user/me`, 
                    {method:"GET"
                    }
                )
                // console.log(userRes)
                if(userRes.ok){
                    const data = await userRes.json()
                    console.log(data.body.resume)
                }
            } catch (error) {
                
            }
        }
        useEffect(() => {getUserResume()},[])
    // setTimeout(() => {
    //     setViewSuccessMessage(false)
    // }, 3000)
    
  return (
    <>
{viewSuccessMessage === true ? (
    <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
        <FiCheckCircle size={20} />
        <p className="text-sm font-medium">Resume uploaded successfully!</p>
    </div>
) : null}

<div className='w-3xl h-96 flex bg-white text-black flex-col items-center justify-center gap-4'>
    <h1 className='text-3xl font-semibold'>Upload Your Resume</h1>
    <p className='text-sm'>You just have to upload your resume for once and our system will handle the rest.</p>
    <UploadButton
        endpoint="resumeUploader"
        onClientUploadComplete={(res) => {
            const fileUrl = res[0].ufsUrl
            setResumeFile(fileUrl)
            uploadResume(fileUrl)
        }}
        className='bg-blue-500 rounded-2xl mt-5 hover:bg-blue-700 p-4'
    />
</div>
    </>
    
  )
}

export default ResumeUploadCard